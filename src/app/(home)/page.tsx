// actions
import { getActivityCalls } from '@/actions/activity'

// components
import { ActivityCallCard } from '@/components/activity-call-card'
import { ArchiveButton } from '@/components/archive-button'
import { CallsCard } from '@/components/calls-card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const HomePage = async () => {
  const { data: calls } = await getActivityCalls()

  if (!calls) {
    return (
      <CallsCard>{'Error fetching calls. Please try again later!'}</CallsCard>
    )
  }

  const feedCalls = calls.filter((call) => !call.is_archived).reverse()
  const archiveCalls = calls.filter((call) => call.is_archived).reverse()

  return (
    <CallsCard>
      <Tabs defaultValue="feed">
        <TabsList className="flex justify-center mb-4">
          <TabsTrigger className="grow" value="feed">
            Activity Feed
          </TabsTrigger>
          <TabsTrigger className="grow" value="archive">
            Archive
          </TabsTrigger>
        </TabsList>
        <TabsContent value="feed">
          <div className="flex flex-col gap-4">
            {feedCalls.length > 0 ? (
              <>
                <ArchiveButton calls={feedCalls} type="archive" />
                {feedCalls.map((call, i) => {
                  return <ActivityCallCard key={i} call={call} />
                })}
              </>
            ) : (
              <p>No calls in feed.</p>
            )}
          </div>
        </TabsContent>
        <TabsContent value="archive">
          <div className="flex flex-col gap-4">
            {archiveCalls.length > 0 ? (
              <>
                <ArchiveButton calls={archiveCalls} type="unarchive" />
                {archiveCalls.map((call, i) => {
                  return <ActivityCallCard key={i} call={call} />
                })}
              </>
            ) : (
              <p>No calls in archive.</p>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </CallsCard>
  )
}

export default HomePage
