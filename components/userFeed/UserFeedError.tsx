import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { AlertCircle, RefreshCw } from "lucide-react"

interface UserFeedErrorProps {
    error: unknown
    refetch: () => void
}

export default function UserFeedError({ error, refetch }: UserFeedErrorProps) {
    return (
        <Card>
            <CardContent className="p-6">
                <Alert>
                    <AlertCircle className="h-4 w-4 text-[#319795]" />
                    <AlertDescription className="flex items-center justify-between text-[#1A202C]">
                        <span>Failed to load users: {error instanceof Error ? error.message : "Unknown error"}</span>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={refetch}
                            className="ml-4 border-[#319795] text-[#319795] hover:bg-[#319795]/10"
                        >
                            <RefreshCw className="w-4 h-4 mr-2" />
                            Retry
                        </Button>
                    </AlertDescription>
                </Alert>
            </CardContent>
        </Card>
    )
}
