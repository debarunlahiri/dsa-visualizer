export interface Activity {
  id: string
  start: number
  finish: number
  name?: string // Optional name for activity
}

export interface ActivitySelectionStep {
  description: string
  activities: Activity[] // Original list, sorted by finish times
  selectedActivities: Activity[]
  currentActivityIndex?: number // Index of activity being considered
  lastSelectedActivityFinishTime?: number
  isCompatible?: boolean // True if currentActivity is compatible with last selected
  isFinalSelection?: boolean // True for steps that finalize a selection
}

export function generateActivitySelectionSteps(activitiesInput: Activity[]): ActivitySelectionStep[] {
  const steps: ActivitySelectionStep[] = []

  // Create a copy and sort activities by finish times
  const activities = [...activitiesInput]
    .map((a, index) => ({ ...a, originalIndex: index })) // Keep original index if needed later
    .sort((a, b) => a.finish - b.finish)

  steps.push({
    description: `Initial activities, sorted by finish times: [${activities.map((a) => `${a.name || a.id}(${a.start}-${a.finish})`).join(", ")}]`,
    activities: activities.map((a) => ({ ...a })),
    selectedActivities: [],
  })

  if (activities.length === 0) {
    steps.push({
      description: "No activities to select.",
      activities: [],
      selectedActivities: [],
      isFinalSelection: true,
    })
    return steps
  }

  const selectedActivities: Activity[] = []
  // Select the first activity
  selectedActivities.push(activities[0])
  let lastSelectedActivityFinishTime = activities[0].finish

  steps.push({
    description: `Selected the first activity: ${activities[0].name || activities[0].id} (ends at ${activities[0].finish}).`,
    activities: activities.map((a) => ({ ...a })),
    selectedActivities: [...selectedActivities],
    currentActivityIndex: 0,
    lastSelectedActivityFinishTime,
    isCompatible: true,
    isFinalSelection: true,
  })

  for (let i = 1; i < activities.length; i++) {
    const currentActivity = activities[i]
    steps.push({
      description: `Considering activity ${currentActivity.name || currentActivity.id} (starts ${currentActivity.start}, finishes ${currentActivity.finish}). Last selected activity finished at ${lastSelectedActivityFinishTime}.`,
      activities: activities.map((a) => ({ ...a })),
      selectedActivities: [...selectedActivities],
      currentActivityIndex: i,
      lastSelectedActivityFinishTime,
    })

    if (currentActivity.start >= lastSelectedActivityFinishTime) {
      selectedActivities.push(currentActivity)
      lastSelectedActivityFinishTime = currentActivity.finish
      steps.push({
        description: `Activity ${currentActivity.name || currentActivity.id} is compatible (starts ${currentActivity.start} >= finishes ${selectedActivities[selectedActivities.length - 2]?.finish || 0}). Selected it. New last finish time: ${lastSelectedActivityFinishTime}.`,
        activities: activities.map((a) => ({ ...a })),
        selectedActivities: [...selectedActivities],
        currentActivityIndex: i,
        lastSelectedActivityFinishTime,
        isCompatible: true,
        isFinalSelection: true,
      })
    } else {
      steps.push({
        description: `Activity ${currentActivity.name || currentActivity.id} is NOT compatible (starts ${currentActivity.start} < finishes ${lastSelectedActivityFinishTime}). Skipped.`,
        activities: activities.map((a) => ({ ...a })),
        selectedActivities: [...selectedActivities],
        currentActivityIndex: i,
        lastSelectedActivityFinishTime,
        isCompatible: false,
      })
    }
  }

  steps.push({
    description: `Activity selection complete. Selected activities: [${selectedActivities.map((a) => a.name || a.id).join(", ")}]`,
    activities: activities.map((a) => ({ ...a })),
    selectedActivities: [...selectedActivities],
    isFinalSelection: true,
  })

  return steps
}
