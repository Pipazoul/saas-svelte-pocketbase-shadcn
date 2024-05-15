import {notification, pb} from "../store";
import { goto } from "$app/navigation";
import type { UsersResponse } from "../types/pocketbase-types";


export async function login(username: string, password: string) : Promise<any> {
    try {
        await pb.collection("users").authWithPassword(username, password);
        goto("/");
    }
    catch (e) {
        console.log(e);
        notification.set({
            body: "Wrong username or password",
            type: "alert-error",
            show: true
        });
        return e;
    }
}

export async function signup(username: string, email: string, password: string,passwordConfirm: string) {
    try {
        const data = {
            email,
            username,
            password,
            passwordConfirm,
            plan: "free",
        };
        await pb.collection("users").create<UsersResponse>(data);
        
        await login(username, password);
        
        await pb.collection('users').requestVerification(email);

        goto("/");
    }
    catch (e) {
        let body = "Une erreur s'est produite, verifiez les champs";
        // check if username has spaces
        if(username.includes(" ")){
            body = "Le nom d'utilisateur ne doit pas contenir d'espaces";
        }
        if(!username){
            body = "Le nom d'utilisateur est requis";
        }
        if(!email){
            body = "L'email est requis";
        }
        if(!password){
            body = "Le mot de passe est requis";
        }
        if(!passwordConfirm){
            body = "La confirmation du mot de passe est requise";
        }
        if(password !== passwordConfirm){
            body = "Les mots de passe ne correspondent pas";
        }

        console.log(e);
        notification.set({
            body: body,
            type: "alert-error",
            show: true

        });
        return e;
    }

}

export async function sendVerificationEmail(email: string) {
    try {
        await pb.collection('users').requestVerification(email);
    }
    catch (e) {
        console.log(e);
        notification.set({
            body: "Wrong username or password",
            type: "alert-error",
            show: true
        });
        return e;
    }
}

export async function confirmEmailVerification(token: string) {
    try {
        const request = await pb.collection('users').confirmVerification(token);
        if(request) {
            notification.set({
                body: "Email vérifié avec succès",
                type: "alert-success",
                show: true
            });
            // sleep for 2 seconds
            await new Promise(resolve => setTimeout(resolve, 2000));
            // redirect
            goto("/");
        }
    }
    catch (e) {
        console.log(e);
        notification.set({
            body: "Le token est invalide",
            type: "alert-error",
            show: true
        });
        await new Promise(resolve => setTimeout(resolve, 2000));
        goto("/");
    }
}

export function logout() {
    pb.authStore.clear();
    // refresh the page
    location.reload();

}