import {cn} from "@/lib/utils.ts"
import {Button} from "@/components/ui/button.tsx"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card.tsx"
import {Input} from "@/components/ui/input.tsx"
import {Label} from "@/components/ui/label.tsx"
import {ROUTS} from "@/routes/routes.tsx";
import {Link} from "react-router";

export function RegisterForm({
                                 className,
                                 ...props
                             }: React.ComponentProps<"div">) {


    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle>Register new account</CardTitle>
                    <CardDescription>
                        Enter your email or login to register your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-3">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                />
                            </div>
                            <div className="grid gap-3">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>

                                </div>
                                <Input id="password" type="password" required/>
                            </div>

                            <div className="grid gap-3">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Confirm your password</Label>

                                </div>
                                <Input id="password" type="password" required/>
                            </div>

                            <div className="flex flex-col gap-3">
                                <Button type="submit" className="w-full">
                                    Register
                                </Button>
                                <Button variant="outline" className="w-full">
                                    Login with Google
                                </Button>
                            </div>
                        </div>
                        <div className="mt-4 text-center text-sm">
                            Already have an account?{" "}
                            <Link to={ROUTS.LOGIN} className="underline underline-offset-4">
                                Login
                            </Link>

                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
