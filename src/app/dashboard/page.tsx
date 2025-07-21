import { Suspense } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { BookOpen, Users, Calendar, Award, TrendingUp } from "lucide-react"
import ReadingGoalCard from "@/components/dashboard/reading-goal-card"
import GroupActivityCard from "@/components/dashboard/group-activity-card"
import DashboardSkeleton from "@/components/dashboard/dashboard-skeleton"

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="reading">Reading</TabsTrigger>
          <TabsTrigger value="groups">Groups</TabsTrigger>
          <TabsTrigger value="donations">Donations</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">7 days</div>
                <p className="text-xs text-muted-foreground">+2 from last week</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Pages Read</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">124</div>
                <p className="text-xs text-muted-foreground">This month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Active Groups</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2</div>
                <p className="text-xs text-muted-foreground">3 new invitations</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Donations</CardTitle>
                <Award className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$45</div>
                <p className="text-xs text-muted-foreground">Contributed this month</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Suspense fallback={<DashboardSkeleton />}>
              <ReadingGoalCard />
            </Suspense>

            <Suspense fallback={<DashboardSkeleton />}>
              <GroupActivityCard />
            </Suspense>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Reading Progress</CardTitle>
              <CardDescription>Your daily reading activity over the past 30 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[200px] flex items-end gap-2">
                {Array.from({ length: 30 }).map((_, i) => {
                  const height = Math.random() * 100
                  return (
                    <div
                      key={i}
                      className="bg-emerald-500 dark:bg-emerald-600 rounded-sm w-full"
                      style={{ height: `${height}%` }}
                    />
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reading" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Reading Goals</CardTitle>
              <CardDescription>Track your daily and weekly reading goals</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Daily Goal: 5 pages</span>
                  <span className="text-sm text-muted-foreground">3/5 pages</span>
                </div>
                <Progress value={60} className="h-2" />
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Weekly Goal: 30 pages</span>
                  <span className="text-sm text-muted-foreground">18/30 pages</span>
                </div>
                <Progress value={60} className="h-2" />
              </div>

              <Button>Update Reading Progress</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Reading History</CardTitle>
              <CardDescription>Your reading activity over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div className="space-y-2">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center mr-3">
                      <BookOpen className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                      <p className="font-medium">Completed daily goal</p>
                      <p className="text-sm text-muted-foreground">Today at 8:30 AM</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center mr-3">
                      <TrendingUp className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                      <p className="font-medium">Streak milestone: 7 days</p>
                      <p className="text-sm text-muted-foreground">Yesterday at 9:15 PM</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center mr-3">
                      <Award className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                      <p className="font-medium">Completed Surah Al-Baqarah</p>
                      <p className="text-sm text-muted-foreground">3 days ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="groups">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Madinah Circle</CardTitle>
                <CardDescription>5 members • Created 2 months ago</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Group Progress</span>
                      <span className="text-sm text-muted-foreground">85%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>

                  <div className="flex justify-between text-sm">
                    <span>Next meeting: Tomorrow, 8:00 PM</span>
                    <Button variant="outline" size="sm">
                      View Group
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Ramadan Khatm</CardTitle>
                <CardDescription>12 members • Created 2 weeks ago</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Group Progress</span>
                      <span className="text-sm text-muted-foreground">42%</span>
                    </div>
                    <Progress value={42} className="h-2" />
                  </div>

                  <div className="flex justify-between text-sm">
                    <span>Next meeting: Friday, 7:30 PM</span>
                    <Button variant="outline" size="sm">
                      View Group
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="donations">
          <Card>
            <CardHeader>
              <CardTitle>Donation History</CardTitle>
              <CardDescription>Track your charitable contributions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-4 border-b">
                  <div>
                    <p className="font-medium">Islamic Relief</p>
                    <p className="text-sm text-muted-foreground">July 15, 2025</p>
                  </div>
                  <p className="font-medium">$25.00</p>
                </div>

                <div className="flex justify-between items-center pb-4 border-b">
                  <div>
                    <p className="font-medium">Muslim Aid</p>
                    <p className="text-sm text-muted-foreground">July 8, 2025</p>
                  </div>
                  <p className="font-medium">$15.00</p>
                </div>

                <div className="flex justify-between items-center pb-4 border-b">
                  <div>
                    <p className="font-medium">Penny Appeal</p>
                    <p className="text-sm text-muted-foreground">June 30, 2025</p>
                  </div>
                  <p className="font-medium">$5.00</p>
                </div>

                <div className="flex justify-between items-center">
                  <p className="font-medium">Total Donations</p>
                  <p className="font-bold">$45.00</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
