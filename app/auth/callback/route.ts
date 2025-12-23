import { createServerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const requestUrl = new URL(request.url);
    const cookieStore = await cookies();
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) {
                    return cookieStore.get(name)?.value;
                },
                set(name: string, value: string, options: any) {
                    cookieStore.set({ name, value, ...options });
                },
                remove(name: string, options: any) {
                    cookieStore.delete({ name, ...options });
                },
            },
        }
    );
    const code = requestUrl.searchParams.get('code');

    if (code) {
        await supabase.auth.exchangeCodeForSession(code);
    }

    let redirectPath = '/';

    try {
        const { data: { user } } = await supabase.auth.getUser();

        if (user) {
            const { data: profile, error } = await supabase
                .from('profiles')
                .select('role')
                .eq('id', user.id)
                .single();

            if (error && error.code !== 'PGRST116') {
                console.error('Failed to fetch user role during auth callback', error);
            }

            const role = profile?.role || (user.user_metadata as any)?.role;
            redirectPath = role === 'admin' ? '/admin' : '/';
        }
    } catch (error) {
        console.error('Auth callback redirect failed, using default', error);
    }

    return NextResponse.redirect(`${requestUrl.origin}${redirectPath}`);
}
