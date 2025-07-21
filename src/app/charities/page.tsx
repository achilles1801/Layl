import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, ExternalLink } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function CharitiesPage() {
  const charities = [
    {
      id: 1,
      name: "Islamic Relief",
      description: "Providing humanitarian aid to those who need it most",
      image: "/placeholder.svg?height=80&width=80",
      category: "Humanitarian",
      featured: true,
      donationCount: 1245,
    },
    {
      id: 2,
      name: "Muslim Aid",
      description: "Fighting poverty and supporting sustainable development",
      image: "/placeholder.svg?height=80&width=80",
      category: "Poverty Relief",
      featured: false,
      donationCount: 876,
    },
    {
      id: 3,
      name: "Penny Appeal",
      description: "Transforming lives and empowering communities around the world",
      image: "/placeholder.svg?height=80&width=80",
      category: "Community Development",
      featured: false,
      donationCount: 932,
    },
    {
      id: 4,
      name: "Human Appeal",
      description: "Saving lives through emergency response and sustainable solutions",
      image: "/placeholder.svg?height=80&width=80",
      category: "Emergency Relief",
      featured: true,
      donationCount: 1089,
    },
    {
      id: 5,
      name: "Muslim Hands",
      description: "Working in over 30 countries to help those in need",
      image: "/placeholder.svg?height=80&width=80",
      category: "Education",
      featured: false,
      donationCount: 754,
    },
    {
      id: 6,
      name: "Orphans in Need",
      description: "Supporting orphans and widows worldwide",
      image: "/placeholder.svg?height=80&width=80",
      category: "Orphan Care",
      featured: false,
      donationCount: 621,
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Charity Partners</h1>
      <p className="text-lg text-muted-foreground mb-8 max-w-3xl">
        When you miss a reading day, your pledged donation goes to one of our vetted charity partners. All partners are
        carefully selected to ensure they follow Islamic principles and make a real impact.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {charities.map((charity) => (
          <Card key={charity.id} className="overflow-hidden">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 rounded-md overflow-hidden">
                    <Image
                      src={charity.image || "/placeholder.svg"}
                      alt={`${charity.name} logo`}
                      width={80}
                      height={80}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <CardTitle>{charity.name}</CardTitle>
                    <CardDescription>{charity.category}</CardDescription>
                  </div>
                </div>
                {charity.featured && <Badge className="bg-emerald-500 hover:bg-emerald-600">Featured</Badge>}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>{charity.description}</p>
              <div className="flex items-center text-sm text-muted-foreground">
                <Heart className="h-4 w-4 mr-2 text-rose-500" />
                <span>{charity.donationCount} donations through Layl</span>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" asChild>
                <Link href={`/charities/${charity.id}`}>Learn More</Link>
              </Button>
              <Button asChild>
                <Link href={`/charities/${charity.id}/donate`}>
                  Donate <ExternalLink className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
