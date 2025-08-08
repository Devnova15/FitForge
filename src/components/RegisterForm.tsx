import { useState } from "react";
import { cn } from "@/lib/utils.ts"
import { Button } from "@/components/ui/button.tsx"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card.tsx"
import { Input } from "@/components/ui/input.tsx"
import { Label } from "@/components/ui/label.tsx"
import { ROUTS } from "@/routes/routes.tsx";
import { Link, useNavigate } from "react-router";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { useAuth } from "@/auth/useAuth.ts";
interface RegisterFormData {
    email: string;
    password: string;
    confirmPassword: string;
}

export function RegisterForm({
                                 className,
                                 ...props
                             }: React.ComponentProps<"div">) {
    const navigate = useNavigate();
    const { register } = useAuth();
    const [formData, setFormData] = useState<RegisterFormData>({
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (formData.password !== formData.confirmPassword) {
            setError("Пароли не совпадают");
            return;
        }

        try {
            await register(formData.email, formData.password);
            setIsSuccess(true);
            setTimeout(() => {
                navigate(ROUTS.LOGIN);
            }, 2000);
        } catch (err) {
            setError("Ошибка при регистрации");
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    return (
        <>
            <div className={cn("flex flex-col gap-6", className)} {...props}>
                <Card>
                    <CardHeader>
                        <CardTitle>Регистрация нового аккаунта</CardTitle>
                        <CardDescription>
                            Введите email и пароль для регистрации
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit}>
                            <div className="flex flex-col gap-6">
                                <div className="grid gap-3">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="m@example.com"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="password">Пароль</Label>
                                    <Input
                                        id="password"
                                        name="password"
                                        type="password"
                                        required
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="grid gap-3">
                                    <Label htmlFor="confirmPassword">Подтвердите пароль</Label>
                                    <Input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type="password"
                                        required
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                    />
                                </div>

                                {error && (
                                    <p className="text-sm text-red-500 text-center">{error}</p>
                                )}

                                <div className="flex flex-col gap-3">
                                    <Button type="submit" className="w-full">
                                        Зарегистрироваться
                                    </Button>
                                    <Button variant="outline" className="w-full">
                                        Войти через Google
                                    </Button>
                                </div>
                            </div>
                            <div className="mt-4 text-center text-sm">
                                Уже есть аккаунт?{" "}
                                <Link to={ROUTS.LOGIN} className="underline underline-offset-4">
                                    Войти
                                </Link>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>

            <Dialog open={isSuccess} onOpenChange={setIsSuccess}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Регистрация успешна!</DialogTitle>
                        <DialogDescription>
                            Ваш аккаунт успешно создан. Сейчас вы будете перенаправлены на страницу входа.
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </>
    )
}