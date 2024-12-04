// actions
import { getActivityCalls } from '@/actions/activity'

// components
import { ActivityCallCard } from '@/components/cards/activity-call-card'
import { ArchiveCallButton } from '@/components/buttons/archive-call-button'
import { CallsCard } from '@/components/cards/calls-card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

// utils
import { sortCalls } from '@/lib/utils'

export const dynamic = 'force-dynamic'

const HomePage = async () => {
  const { data: calls } = await getActivityCalls()

  if (!calls) {
    return (
      <CallsCard>{'Error fetching calls. Please try again later!'}</CallsCard>
    )
  }

  const feedCalls = sortCalls(calls.filter((call) => !call.is_archived))
  const archiveCalls = sortCalls(calls.filter((call) => call.is_archived))

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
                <ArchiveCallButton calls={feedCalls} type="archive" />
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
                <ArchiveCallButton calls={archiveCalls} type="unarchive" />
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
