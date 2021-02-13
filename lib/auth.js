import React, { useState, useEffect, useContext, createContext } from "react";
import Router from "next/router";
import firebase from "firebase/app";
import Cookies from "js-cookie";

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

			// Cookies.set("tsks-auth", true, {
			// 	expires: 1
			// });

			setLoading(false);
			return user;
		} else {
			Router.push("/");
			setUser(false);
			// Cookies.remove("tsks-auth");

			setLoading(false);
			return false;
		}
	};

	const signinWithGitHub = () => {
		return firebase
			.auth()
			.signInWithPopup(new firebase.auth.GithubAuthProvider())
			.then((response) => handleUser(response.user));

		Router.push("/app");
	};

	const signinWithGoogle = (redirect) => {
		setLoading(true);
		return firebase
			.auth()
			.signInWithPopup(new firebase.auth.GoogleAuthProvider())
			.then((response) => {
				handleUser(response.user);

				Router.push("/app");
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

const getUserRole = async () => {
	await firebase.auth().currentUser.getIdToken(true);
	const decodedToken = await firebase.auth().currentUser.getIdTokenResult();

	console.log(firebase.auth().currentUser.userRole);

	if (decodedToken.userRole) {
		return decodedToken.userRole;
	} else {
		return "free";
	}
};

const formatUser = async (user) => {
	const token = await firebase.auth().currentUser.getIdToken(true);
	return {
		uid: user.uid,
		email: user.email,
		name: user.displayName,
		provider: user.providerData[0].providerId,
		photoUrl: user.photoURL,
		token,
		userRole: user?.uid === "sCvnw2lco1dXvpNuNySV94r120n1" ? "admin" : "free"
	};
};
