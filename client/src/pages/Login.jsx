import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import { useAuthForm } from "@/hooks/useAuthForm";

const Login = () => {
  const [searchParams] = useSearchParams();
  const roleFromURL = searchParams.get("role") || "student";
  const [formType, setFormType] = useState("login");

  const {
    formInput,
    handleChange,
    handleSubmit,
    loginIsLoading,
    registerIsLoading,
  } = useAuthForm(roleFromURL, formType);

  const renderInputField = (label, name, type = "text", placeholder) => (
    <div className="space-y-1">
      <Label htmlFor={name}>{label}</Label>
      <Input
        type={type}
        name={name}
        value={formInput[name]}
        onChange={handleChange}
        placeholder={placeholder}
        required
      />
    </div>
  );

  const renderForm = (type) => (
    <Card>
      <CardHeader>
        <CardTitle>
          {type === "signup" ? "Sign up" : "Log in"}
          {roleFromURL === "instructor" && " as an Instructor"}
        </CardTitle>
        <CardDescription>
          {type === "signup"
            ? "Create a new account and click signup when you're done."
            : "Login to your account."}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        {type === "signup" &&
          renderInputField("Name", "name", "text", "Eg. John Doe")}
        {renderInputField("Email", "email", "email", "Eg. john@example.com")}
        {renderInputField("Password", "password", "password", "••••••••")}
      </CardContent>
      <CardFooter>
        <Button
          disabled={formType === "signup" ? registerIsLoading : loginIsLoading}
          onClick={handleSubmit}
        >
          {(formType === "signup" ? registerIsLoading : loginIsLoading) ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </>
          ) : type === "signup" ? (
            "Sign up"
          ) : (
            "Log in"
          )}
        </Button>
      </CardFooter>
    </Card>
  );

  return (
    <div className="flex items-center w-full justify-center mt-20">
      <Tabs
        defaultValue="login"
        className="w-[400px]"
        onValueChange={setFormType}
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signup">Sign up</TabsTrigger>
          <TabsTrigger value="login">Log in</TabsTrigger>
        </TabsList>
        <TabsContent value="signup">{renderForm("signup")}</TabsContent>
        <TabsContent value="login">{renderForm("login")}</TabsContent>
      </Tabs>
    </div>
  );
};

export default Login;
