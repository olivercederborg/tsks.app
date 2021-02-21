import React, { useState, useEffect, useContext, createContext } from "react";
import Router from "next/router";
import firebase from "firebase/app";

import { createUser, updateDbEmail } from "@/lib/db";
import { mutate } from "swr";
import { getUser } from "./db-admin";
import { useToast } from "@chakra-ui/react";

const authContext = createContext();

export function AuthProvider({ children }) {
	const auth = useProvideAuth();
	return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
	return useContext(authContext);
};

function useProvideAuth() {
	const toast = useToast();
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const handleUser = async (rawUser) => {
		if (rawUser) {
			const user = await formatUser(rawUser);
			const { token, ...userWithoutToken } = user;

			createUser(user.uid, userWithoutToken);
			setUser(user);
			setLoading(false);
			setError(null);

			return user;
		} else {
			setUser(false);
			setLoading(false);
			setError(null);

			return false;
		}
	};

	const signinWithGoogle = () => {
		setLoading(true);
		return firebase
			.auth()
			.signInWithPopup(new firebase.auth.GoogleAuthProvider())
			.then((response) => {
				handleUser(response.user);
				Router.push("/app");
			});
	};

	const signinWithFacebook = () => {
		setLoading(true);
		return firebase
			.auth()
			.signInWithPopup(new firebase.auth.FacebookAuthProvider())
			.then((response) => {
				handleUser(response.user);
				Router.push("/app");
			});
	};

	const signupWithEmail = (email, password) => {
		setLoading(true);
		return firebase
			.auth()
			.createUserWithEmailAndPassword(email, password)
			.then((response) => {
				handleUser(response.user);
				Router.push("/app");
			})
			.catch((error) => {
				setError(error);
			});
	};

	const signinWithEmail = (email, password) => {
		setLoading(true);
		return firebase
			.auth()
			.signInWithEmailAndPassword(email, password)
			.then((response) => {
				handleUser(response.user);
				Router.push("/app");
			})
			.catch((error) => {
				setError(error);
			});
	};

	const signout = () => {
		return firebase
			.auth()
			.signOut()
			.then(() => {
				setUser(false);
				Router.push("/");
			});
	};

	const updateUserName = (newName) => {
		firebase
			.auth()
			.currentUser.updateProfile({
				displayName: newName
			})
			.then(function () {
				console.log("Updated to", newName);
			})
			.catch(function (error) {
				setError(error);
			});
	};

	const reauthUser = (userProvidedPassword) => {
		const credential = firebase.auth.EmailAuthProvider.credential(
			user.email,
			userProvidedPassword
		);

		return firebase
			.auth()
			.currentUser.reauthenticateWithCredential(credential);
	};

	const verifyEmail = () => {
		firebase
			.auth()
			.currentUser.sendEmailVerification()
			.then(function () {
				console.log("Email verification sent.");
			})
			.catch(function (error) {
				setError(error);
			});
	};

	const updateUserPassword = (newPassword, userProvidedPassword) => {
		reauthUser(userProvidedPassword).then(() => {
			firebase
				.auth()
				.currentUser.updatePassword(newPassword)
				.then(function () {
					console.log("Password updated to", newPassword);
				})
				.catch(function (error) {
					setError(error);
				});
		});
	};

	useEffect(() => {
		const unsubscribe = firebase.auth().onAuthStateChanged(handleUser);

		return () => unsubscribe();
	}, []);

	return {
		error,
		user,
		signupWithEmail,
		signinWithEmail,
		signinWithGoogle,
		signinWithFacebook,
		signout,
		updateUserName,
		verifyEmail,
		// updateUserEmail,
		updateUserPassword,
		reauthUser
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
		emailVerified: user.emailVerified,
		userRole: user?.uid === "sCvnw2lco1dXvpNuNySV94r120n1" ? "admin" : "free"
	};
};
