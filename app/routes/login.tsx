import type { ActionArgs, LoaderArgs, V2_MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form as RemixForm, useActionData, useNavigation, useSearchParams } from "@remix-run/react";
import { useState } from "react";
import { Button, Checkbox, Form, Link } from "~/components";
import { verifyLogin } from "~/models/user.server";
import { createUserSession, getUserId } from "~/session.server";
import { safeRedirect, validateEmail } from "~/utils";

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
  const remember = formData.get("remember");

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

  const user = await verifyLogin(email, password);
  if (!user) {
    return json(
      { errors: { email: "Invalid email or password", password: null } },
      { status: 400 }
    );
  }

  return createUserSession({
    redirectTo,
    remember: remember === "on" ? true : false,
    request,
    userId: user.id,
  });
};

export const meta: V2_MetaFunction = () => [{ title: "Log in" }];

export default function LoginPage() {
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/notes";
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const buttonDisabled = navigation.state === 'submitting' || !email || !password
  return (
    <main className="flex min-h-full flex-col justify-center items-center container gap-4">
      <h1>Log in</h1>
      <Form.Root asChild >
        <RemixForm method="post" className="space-y-6">
          <Form.Input
            autoComplete="email"
            autoFocus={true}
            id="email"
            kind={actionData?.errors.email ? 'error' : 'primary'}
            label="Email address"
            testId="email"
            messages={[
              {
                match: 'valueMissing', message: 'Please enter your email'
              },
              {
                match: 'typeMismatch', message: 'Please enter an email'
              },
              {
                match: () => { return Boolean(actionData?.errors.email) },
                forceMatch: Boolean(actionData?.errors.email),
                message: String(actionData?.errors.email)
              }
            ]}
            name="email"
            onChange={(e: any) => setEmail(e.target.value)}
            required
            serverInvalid={Boolean(actionData?.errors.email)}
            type="email"
            value={email}
          />

          <Form.Input
            autoComplete="current-password"
            id="password"
            testId="password"
            label="Password"
            kind={actionData?.errors.password ? 'error' : 'primary'}
            messages={[
              {
                match: () => Boolean(actionData?.errors.password),
                message: String(actionData?.errors.password)
              }
            ]}
            name="password"
            onChange={(e: any) => setPassword(e.target.value)}
            required
            serverInvalid={Boolean(actionData?.errors.password)}
            type="password"
            value={password}
          />

          <input type="hidden" name="redirectTo" value={redirectTo} />
          <Form.Submit asChild>
            <Button
              disabled={buttonDisabled}
            >
              Log in
            </Button>
          </Form.Submit>
          <div role="form" aria-label="Log in options" className="flex flex-col items-start justify-between">
            <Checkbox
              id="remember"
              name="remember"
              label="Remember me"
            />
            <div className="flex gap-4">
              Don't have an account?{" "}
              <Link
                to={{
                  pathname: "/join",
                  search: searchParams.toString(),
                }}
              >
                Sign up
              </Link>
            </div>
          </div>
        </RemixForm>
      </Form.Root>
    </main >
  );
}
