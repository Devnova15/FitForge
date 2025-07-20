import {AppSidebar} from "@/components/app-sidebar";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {Separator} from "@/components/ui/separator";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Award, Image, Plus, MinusCircle, PlusCircle} from "lucide-react";
import {Button} from "@/components/ui/button";
import {useState} from "react";

export default function Account() {
    const [activeTab, setActiveTab] = useState("posts");
    const [weightValue, setWeightValue] = useState(0);

    const uploadAwards = async () => {
        const awardsData = [
            {
                title: "Early Bird",
                description: "You started your day early 5 times in a row!",
                type: "streak",                 // Награда за ранний подъём 5 дней подряд
                threshold: 5,
                icon: "AlarmClock",
                imageUrl: "../awardsImg/alarm-clock-time-svgrepo-com.svg",
                content: "Early Bird Award - You started your day early 5 times in a row!",
                color: "blue"
            },
            {
                title: "First Badge",
                description: "You've earned your very first badge!",
                type: "achievement",            // Награда за получение первой ачивки
                threshold: 1,
                icon: "Badge",
                imageUrl: "../awardsImg/badge-svgrepo-com.svg",
                content: "First Badge Award - You've earned your very first badge!",
                color: "green"
            },
            {
                title: "10-Day Streak",
                description: "You have logged in for 10 days in a row!",
                type: "streak",                 // Награда за вход в приложение 10 дней подряд
                threshold: 10,
                icon: "Calendar",
                imageUrl: "../awardsImg/calendar-svgrepo-com.svg",
                content: "10-Day Streak Award - You have logged in for 10 days in a row!",
                color: "yellow"
            },
            {
                title: "On Fire",
                description: "You maintained high activity for a whole week!",
                type: "activity",               // Награда за высокую активность 7 дней подряд
                threshold: 7,
                icon: "Fire",
                imageUrl: "../awardsImg/fire-svgrepo-com.svg",
                content: "On Fire Award - You maintained high activity for a whole week!",
                color: "orange"
            },
            {
                title: "Flame Keeper",
                description: "Your motivation is burning bright!",
                type: "motivation",             // Награда за поддержание мотивации 30 дней
                threshold: 30,
                icon: "Flame",
                imageUrl: "../awardsImg/flame-svgrepo-com.svg",
                content: "Flame Keeper Award - Your motivation is burning bright!",
                color: "red"
            },
            {
                title: "Strong Start",
                description: "You completed your first workout session!",
                type: "workout",                // Награда за первую тренировку
                threshold: 1,
                icon: "FlexedBiceps",
                imageUrl: "../awardsImg/flexed-biceps-medium-light-skin-tone-svgrepo-com.svg",
                content: "Strong Start Award - You completed your first workout session!",
                color: "purple"
            },
            {
                title: "Healthy Meal",
                description: "Logged your first healthy meal!",
                type: "nutrition",              // Награда за первый приём здоровой пищи
                threshold: 1,
                icon: "Meal",
                imageUrl: "../awardsImg/meal-easter-svgrepo-com.svg",
                content: "Healthy Meal Award - Logged your first healthy meal!",
                color: "teal"
            },
            {
                title: "Medalist",
                description: "Earned 5 medals for achievements!",
                type: "achievement",            // Награда за получение 5 достижений
                threshold: 5,
                icon: "Medal",
                imageUrl: "../awardsImg/medal-svgrepo-com.svg",
                content: "Medalist Award - Earned 5 medals for achievements!",
                color: "gold"
            },
            {
                title: "Hydration Master",
                description: "Tracked your water intake for 7 days straight!",
                type: "streak",                 // Награда за учёт воды 7 дней подряд
                threshold: 7,
                icon: "WaterDrop",
                imageUrl: "../awardsImg/water-drop-svgrepo-com.svg",
                content: "Hydration Master Award - Tracked your water intake for 7 days straight!",
                color: "cyan"
            }
        ];

        const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4Nzc4Nzg3YzQwODA2MjFjMWQ0MTcwYiIsImZpcnN0TmFtZSI6IkFkbWluIiwibGFzdE5hbWUiOiJVc2VyIiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNzUzMDE5NjQzLCJleHAiOjE3NTMwNTU2NDN9.gP4I43T3NUzcjsdFcIpHQIW_5f9osIt1EkwI5ZlqvtA'

        const awardPromises = awardsData.map((award) => {
            return fetch('http://localhost:4000/api/awards', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token,
                },
                body: JSON.stringify(award)
            })

        })

         await Promise.all(awardPromises)
    }


    return (
        <SidebarProvider>
            <AppSidebar/>
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1"/>
                        <Separator
                            orientation="vertical"
                            className="mr-2 data-[orientation=vertical]:h-4"
                        />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbLink href="/">Home</BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator/>
                                <BreadcrumbItem>
                                    <BreadcrumbPage>Account</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    {/* Custom Tab Navigation */}
                    <div className="flex border-b mb-4">
                        <Button
                            variant={activeTab === "posts" ? "default" : "ghost"}
                            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
                            data-state={activeTab === "posts" ? "active" : "inactive"}
                            onClick={() => setActiveTab("posts")}
                        >
                            Posts
                        </Button>
                        <Button
                            variant={activeTab === "awards" ? "default" : "ghost"}
                            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
                            data-state={activeTab === "awards" ? "active" : "inactive"}
                            onClick={() => setActiveTab("awards")}
                        >
                            Awards
                        </Button>
                        <Button
                            variant={activeTab === "progress" ? "default" : "ghost"}
                            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
                            data-state={activeTab === "progress" ? "active" : "inactive"}
                            onClick={() => setActiveTab("progress")}
                        >
                            Weight Progress
                        </Button>
                    </div>

                    {/* Posts Section */}
                    {activeTab === "posts" && (
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <h2 className="text-2xl font-bold">My Posts</h2>
                                <Button onClick={uploadAwards} className="flex items-center gap-2">
                                    <Plus className="h-4 w-4"/> Add New Post
                                </Button>
                            </div>

                            {/* Empty state for posts */}
                            <Card className="border-dashed border-2">
                                <CardContent className="flex flex-col items-center justify-center p-6">
                                    <div className="rounded-full bg-muted p-3">
                                        <Image className="h-6 w-6 text-muted-foreground"/>
                                    </div>
                                    <h3 className="mt-4 text-lg font-semibold">No posts yet</h3>
                                    <p className="text-sm text-muted-foreground text-center mt-2">
                                        Share your fitness journey by creating your first post.
                                        You'll be able to add photos and track your progress.
                                    </p>
                                    <Button className="mt-4">Create your first post</Button>
                                </CardContent>
                            </Card>

                            {/* Sample post for layout reference*/}

                            {/*<Card>*/}
                            {/*  <CardHeader>*/}
                            {/*    <CardTitle>My Workout Today</CardTitle>*/}
                            {/*    <CardDescription>Posted on April 15, 2023</CardDescription>*/}
                            {/*  </CardHeader>*/}
                            {/*  <CardContent>*/}
                            {/*    <p>Completed a 5K run and feeling great! Making progress on my cardio goals.</p>*/}
                            {/*    <div className="grid grid-cols-3 gap-2 mt-4">*/}
                            {/*      <div className="bg-muted aspect-square rounded-md"></div>*/}
                            {/*      <div className="bg-muted aspect-square rounded-md"></div>*/}
                            {/*      <div className="bg-muted aspect-square rounded-md"></div>*/}
                            {/*    </div>*/}
                            {/*  </CardContent>*/}
                            {/*</Card>*/}


                        </div>
                    )}

                    {/* Awards Section */}
                    {activeTab === "awards" && (
                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold">My Awards</h2>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {/* Sample awards */}
                                <Card>
                                    <CardContent className="flex flex-col items-center p-6">
                                        <Award className="h-12 w-12 text-yellow-500"/>
                                        <h3 className="mt-4 font-semibold">First Milestone</h3>
                                        <p className="text-sm text-muted-foreground text-center mt-2">
                                            Completed your first week of training
                                        </p>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardContent className="flex flex-col items-center p-6">
                                        <Award className="h-12 w-12 text-blue-500"/>
                                        <h3 className="mt-4 font-semibold">Weight Loss Champion</h3>
                                        <p className="text-sm text-muted-foreground text-center mt-2">
                                            Lost your first 5 pounds
                                        </p>
                                    </CardContent>
                                </Card>

                                <Card className="border-dashed border-2">
                                    <CardContent className="flex flex-col items-center p-6">
                                        <div className="rounded-full bg-muted p-3">
                                            <Award className="h-6 w-6 text-muted-foreground"/>
                                        </div>
                                        <h3 className="mt-4 font-semibold">More to unlock!</h3>
                                        <p className="text-sm text-muted-foreground text-center mt-2">
                                            Keep up the good work to earn more awards
                                        </p>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    )}

                    {/* Weight Progress Section */}
                    {activeTab === "progress" && (
                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold">Weight Progress</h2>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Track Your Weight Changes</CardTitle>
                                    <CardDescription>
                                        Use the controls to record your current weight
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-8">
                                        <div>
                                            <div className="flex justify-between mb-2">
                                                <span>Weight Loss</span>
                                                <span>Weight Gain</span>
                                            </div>

                                            {/* Custom slider implementation */}
                                            <div className="flex items-center justify-center gap-4 my-6">
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    onClick={() => setWeightValue(Math.max(-20, weightValue - 1))}
                                                >
                                                    <MinusCircle className="h-4 w-4"/>
                                                </Button>

                                                <div
                                                    className="relative w-full h-2 bg-muted rounded-full overflow-hidden">
                                                    <div
                                                        className={`absolute top-0 bottom-0 ${weightValue < 0 ? 'right-1/2' : 'left-1/2'} ${weightValue < 0 ? 'bg-blue-500' : 'bg-red-500'}`}
                                                        style={{
                                                            width: `${Math.abs(weightValue) * 2.5}%`,
                                                            maxWidth: '50%'
                                                        }}
                                                    />
                                                    <div
                                                        className="absolute top-0 bottom-0 left-1/2 w-4 h-4 bg-primary rounded-full -translate-x-1/2 -translate-y-1/4"
                                                    />
                                                </div>

                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    onClick={() => setWeightValue(Math.min(20, weightValue + 1))}
                                                >
                                                    <PlusCircle className="h-4 w-4"/>
                                                </Button>
                                            </div>

                                            <div className="flex justify-between mt-2">
                                                <span className="text-sm text-muted-foreground">-20 lbs</span>
                                                <span
                                                    className="text-sm font-medium">Current: {weightValue > 0 ? '+' : ''}{weightValue} lbs</span>
                                                <span className="text-sm text-muted-foreground">+20 lbs</span>
                                            </div>
                                        </div>

                                        <div className="pt-4 border-t">
                                            <h3 className="font-medium mb-2">Weight History</h3>
                                            <div
                                                className="h-[200px] bg-muted rounded-md flex items-center justify-center">
                                                <p className="text-sm text-muted-foreground">
                                                    Your weight history chart will appear here
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    )}
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
