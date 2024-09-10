import { signIn, signOut, signUp } from "aws-amplify/auth";
import type { FormEvent } from "react";



export const Authentication = () => {
    const handleSignIn = async () => {
        const request = await signIn({
            username: "tytranngoc217556@gmail.com",
            password: "Hongphuocvinh#99",
        })
        console.log(request);
    }
    const handleSignOut = async () => {
        await signOut();
    }
    interface SignUpFormElements extends HTMLFormControlsCollection {
        email: HTMLInputElement;
        password: HTMLInputElement;
    }

    interface SignUpForm extends HTMLFormElement {
        readonly elements: SignUpFormElements;
    }

    const onClick = async function onClick(event: FormEvent<SignUpForm>) {
        // Prevent form from submitting normally
        event.preventDefault();

        const form = event.currentTarget;

        const email = form.elements.email.value;
        const password = form.elements.password.value;

        // Send form data to your sign-up handler
        const { isSignUpComplete } = await signUp({
            username: email,
            password: password,
        });

        console.log(isSignUpComplete);
    };

    return (
        <>
            <form onSubmit={onClick}>
                <label htmlFor="email">Email: </label>
                <input type="text" id="email" name="email" />

                <label htmlFor="password">Password: </label>
                <input type="password" id="password" name="password" />

                <input type="submit" value="Sign Up" />
            </form>

            <button onClick={handleSignIn}>Sign In</button>
            <button onClick={handleSignOut}>Sign Out</button>
        </>
    );
}
