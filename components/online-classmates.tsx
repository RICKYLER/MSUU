import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const onlineClassmates = [
  { id: "1", name: "Maria Garcia", initials: "MG", status: "online" },
  { id: "2", name: "Jose Rizal", initials: "JR", status: "online" },
  { id: "3", name: "Ana Santos", initials: "AS", status: "online" },
  { id: "4", name: "Pedro Cruz", initials: "PC", status: "away" },
  { id: "5", name: "Sofia Reyes", initials: "SR", status: "online" },
]

export function OnlineClassmates() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Online Classmates</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {onlineClassmates.map((classmate) => (
          <div key={classmate.id} className="flex items-center gap-3">
            <div className="relative">
              <Avatar className="h-9 w-9">
                <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                  {classmate.initials}
                </AvatarFallback>
              </Avatar>
              <div
                className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-card ${
                  classmate.status === "online" ? "bg-green-500" : "bg-yellow-500"
                }`}
              />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">{classmate.name}</p>
              <p className="text-xs text-muted-foreground capitalize">{classmate.status}</p>
            </div>
          </div>
        ))}
        <div className="pt-2 text-center">
          <Badge variant="secondary" className="text-xs">
            5 of 35 students online
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}
