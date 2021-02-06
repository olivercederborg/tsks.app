import React, { useState, useEffect, useContext, createContext } from "react";
import Router from "next/router";
import Cookies from "js-cookie";

import firebase from "@/lib/firebase";
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

	const handleUser = async (rawUser) => {
		if (rawUser) {
			const user = await formatUser(rawUser);
			const { token, ...userWithoutToken } = user;

			createUser(user.uid, userWithoutToken);
			setUser(user);

			Cookies.set("feedback-auth", true, {
				expires: 1
			});

			return user;
		} else {
			Router.push("/");
			setUser(false);
			Cookies.remove("feedback-auth");

			return false;
		}
	};

	const signinWithGitHub = () => {
		Router.push("/dashboard");

		return firebase
			.auth()
			.signInWithPopup(new firebase.auth.GithubAuthProvider())
			.then((response) => handleUser(response.user));
	};

	const signinWithGoogle = () => {
		Router.push("/dashboard");

		return firebase
			.auth()
			.signInWithPopup(new firebase.auth.GoogleAuthProvider())
			.then((response) => handleUser(response.user));
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

const getStripeRole = async () => {
	await firebase.auth().currentUser.getIdToken(true);
	const decodedToken = await firebase.auth().currentUser.getIdTokenResult();

	return decodedToken.claims.stripeRole || "free";
};

const formatUser = async (user) => {
	const token = await firebase.auth().currentUser.getIdToken(true);
	return {
		uid: user.uid,
		email: user.email,
		name: user.displayName,
		provider: user.providerData[0].providerId,
		photoUrl: user.photoURL,
		stripeRole: await getStripeRole(),
		token
	};
};
