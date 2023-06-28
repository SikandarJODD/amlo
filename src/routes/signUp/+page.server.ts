import type { PageServerLoad, Actions } from './$types';
import supabase from '$lib/db';



export const actions: Actions = {
    default: async ({ request }) => {
        const { email, password } = Object.fromEntries(await request.formData());
        console.log(email, password);
        await supabase.auth.signUp({
            email: String(email),
            password: String(password)
        })

    }
};