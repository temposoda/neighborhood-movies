import type { ActionArgs, LoaderArgs, V2_MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form as RemixForm, useActionData, useSearchParams, useNavigation } from "@remix-run/react";
import { createUser, getUserByEmail } from "~/models/user.server";
import { createUserSession, getUserId } from "~/session.server";
import { safeRedirect, validateEmail } from "~/utils";
import { Button, Form, Link } from "~/components";
import { useState } from "react";


export const loader = async ({ request }: LoaderArgs) => {
  const userId = await getUserId(request);
  if (userId) return redirect("/");
  return json({});
};

export const action = async ({ request }: ActionArgs) => {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const redirectTo = safeRedirect(formData.get("redirectTo"), "/");

  if (!validateEmail(email)) {
    return json(
      { errors: { email: "Email is invalid", password: null } },
      { status: 400 }
    );
  }

  if (typeof password !== "string" || password.length === 0) {
    return json(
      { errors: { email: null, password: "Password is required" } },
      { status: 400 }
    );
  }

  if (password.length < 8) {
    return json(
      { errors: { email: null, password: "Password is too short" } },
      { status: 400 }
    );
  }

  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return json(
      {
        errors: {
          email: "A user already exists with this email",
          password: null,
        },
      },
      { status: 400 }
    );
  }

  const user = await createUser(email, password);

  return createUserSession({
    redirectTo,
    remember: false,
    request,
    userId: user.id,
  });
};

export const meta: V2_MetaFunction = () => [{ title: "Sign Up" }];

export default function Join() {
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") ?? undefined;
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const buttonDisabled = navigation.state === 'submitting' || !email || !password
  return (
    <main className="flex min-h-full flex-col justify-center items-center container gap-4">
      <h1>Sign up</h1>
      <Form.Root asChild >
        <RemixForm method="post" className="space-y-6">
          <Form.Input
            autoComplete="email"
            autoFocus={true}
            id="email"
            kind={actionData?.errors.email ? 'error' : 'primary'}
            label="Email Address"
            messages={[
              {
                match: 'valueMissing', message: 'Please enter your email'
              },
              {
                match: 'typeMismatch', message: 'Please provide a valid email'
              },
              {
                match: () => Boolean(actionData?.errors.email),
                message: String(actionData?.errors.email),
                forceMatch: Boolean(actionData?.errors.email)
              }
            ]}
            name="email"
            onChange={(event: any) => setEmail(event.target.value)}
            required
            serverInvalid={Boolean(actionData?.errors.email)}
            type="email"
            value={email}
          />

          <Form.Input
            autoComplete="new-password"
            id="password"
            kind={actionData?.errors.password ? 'error' : 'primary'}
            label="Password"
            messages={[
              {
                match: 'tooShort',
                message: 'Your password should be at least 10 characters long'
              },
              {
                match: 'patternMismatch',
                message: 'Your password should contain at least one special character, number, and letter'
              },
              {
                match: () => Boolean(actionData?.errors.password),
                forceMatch: Boolean(actionData?.errors.password),
                message: String(actionData?.errors.password)
              }
            ]}
            minLength={10}
            name="password"
            onChange={(event: any) => setPassword(event.target.value)}
            // pattern="(?=.*\d)(?=.*
            //     [a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-\]\[])"
            required
            serverInvalid={Boolean(actionData?.errors.password)}
            type="password"
            value={password}
          />


          <input type="hidden" name="redirectTo" value={redirectTo} />

          <Form.Submit>
            <Button
              disabled={buttonDisabled}
            >
              Create Account
            </Button>
          </Form.Submit>
          <div className="flex gap-4">
            Already have an account?{" "}
            <Link
              to={{
                pathname: "/login",
                search: searchParams.toString(),
              }}
            >
              Log in
            </Link>
          </div>
        </RemixForm>
      </Form.Root>
    </main >
  );
}
