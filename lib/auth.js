import React, { useState, useEffect, useContext, createContext } from "react";
import Router from "next/router";
import Cookies from "js-cookie";

import firebase from "firebase/app";
import { createUser } from "@/lib/db";

const authContext = createContext();

export function AuthProvider({ children }) {
	const auth = useProvideAuth();
	return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
	return useContext(authContext);
};

function useProvideAuth() {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	const handleUser = async (rawUser) => {
		if (rawUser) {
			const user = await formatUser(rawUser);
			const { token, ...userWithoutToken } = user;

			createUser(user.uid, userWithoutToken);
			setUser(user);

			Cookies.set("tsks-auth", true, {
				expires: 1
			});

			setLoading(false);
			return user;
		} else {
			Router.push("/");
			setUser(false);
			Cookies.remove("tsks-auth");

			setLoading(false);
			return false;
		}
	};

	const signinWithGitHub = () => {
		return firebase
			.auth()
			.signInWithPopup(new firebase.auth.GithubAuthProvider())
			.then((response) => handleUser(response.user));

		Router.push("/dashboard");
	};

	const signinWithGoogle = (redirect) => {
		setLoading(true);
		return firebase
			.auth()
			.signInWithPopup(new firebase.auth.GoogleAuthProvider())
			.then((response) => {
				handleUser(response.user);

				Router.push("/dashboard");
			});
	};

	const signout = () => {
		return firebase
			.auth()
			.signOut()
			.then(() => {
				setUser(false);
			});
	};

	useEffect(() => {
		const unsubscribe = firebase.auth().onAuthStateChanged(handleUser);

		return () => unsubscribe();
	}, []);

	return {
		user,
		signinWithGitHub,
		signinWithGoogle,
		signout
	};
}

const formatUser = async (user) => {
	return {
		uid: user.uid,
		email: user.email,
		name: user.displayName,
		provider: user.providerData[0].providerId,
		photoUrl: user.photoURL,
		token: user.za
	};
};
