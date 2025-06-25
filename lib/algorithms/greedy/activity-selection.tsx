import { AlgorithmExplanation } from "@/components/dsa/algorithm-explanation"

export const activitySelectionExplanationContent = (
  <AlgorithmExplanation>
    <h2>Activity Selection Problem</h2>
    <p>
      The Activity Selection Problem is a classic greedy algorithm problem where you need to select the maximum number
      of activities that can be performed by a single person, given that each activity has a start time and finish time.
      No two activities can be performed simultaneously.
    </p>
    <h3>Problem Statement:</h3>
    <p>
      Given n activities with their start and finish times, select the maximum number of activities that can be
      performed by a single person, assuming that a person can only work on a single activity at a time.
    </p>
    <h3>Greedy Strategy:</h3>
    <ol>
      <li>Sort all activities by their finish times in ascending order.</li>
      <li>Select the first activity (earliest finish time).</li>
      <li>
        For each subsequent activity, select it if its start time is greater than or equal to the finish time of the
        previously selected activity.
      </li>
    </ol>
    <h3>Why Greedy Works:</h3>
    <p>
      The greedy choice property holds: selecting the activity that finishes earliest leaves the most room for
      subsequent activities. This choice doesn't block future optimal choices and leads to an optimal solution.
    </p>
    <h3>Algorithm Steps:</h3>
    <ol>
      <li>Sort activities by finish time: O(n log n)</li>
      <li>Select first activity: O(1)</li>
      <li>Iterate through sorted activities and select compatible ones: O(n)</li>
    </ol>
    <h3>Time Complexity:</h3>
    <p>$$O(n \log n)$$ due to sorting. The selection process is $$O(n)$$.</p>
    <h3>Space Complexity:</h3>
    <p>$$O(1)$$ if sorting in-place, $$O(n)$$ if creating a new sorted array.</p>
    <h3>Applications:</h3>
    <ul>
      <li>Meeting room scheduling</li>
      <li>Job scheduling</li>
      <li>Resource allocation</li>
      <li>Interval scheduling</li>
    </ul>
  </AlgorithmExplanation>
)

export const activitySelectionCodeSnippets = {
  python: `# Activity Selection using Greedy Algorithm
def activity_selection(activities):
    """
    activities: list of tuples (start_time, finish_time, activity_id)
    Returns: list of selected activities
    """
    # Sort activities by finish time
    sorted_activities = sorted(activities, key=lambda x: x[1])
    
    selected = []
    last_finish_time = 0
    
    for start, finish, activity_id in sorted_activities:
        # If this activity starts after the last selected activity finishes
        if start >= last_finish_time:
            selected.append((start, finish, activity_id))
            last_finish_time = finish
    
    return selected

# Version with separate start and finish arrays
def activity_selection_arrays(start, finish):
    """
    start: list of start times
    finish: list of finish times
    Returns: list of selected activity indices
    """
    n = len(start)
    
    # Create list of activities with indices
    activities = [(start[i], finish[i], i) for i in range(n)]
    
    # Sort by finish time
    activities.sort(key=lambda x: x[1])
    
    selected = []
    last_finish = 0
    
    for s, f, idx in activities:
        if s >= last_finish:
            selected.append(idx)
            last_finish = f
    
    return selected

# With detailed information
def activity_selection_detailed(activities):
    """
    Returns both selected activities and the count
    """
    sorted_activities = sorted(activities, key=lambda x: x[1])
    
    selected = []
    last_finish_time = 0
    
    print("Activities sorted by finish time:")
    for i, (start, finish, activity_id) in enumerate(sorted_activities):
        print(f"Activity {activity_id}: ({start}, {finish})")
    
    print("\\nSelection process:")
    for start, finish, activity_id in sorted_activities:
        if start >= last_finish_time:
            selected.append((start, finish, activity_id))
            print(f"Selected Activity {activity_id}: ({start}, {finish})")
            last_finish_time = finish
        else:
            print(f"Rejected Activity {activity_id}: ({start}, {finish}) - conflicts")
    
    return selected, len(selected)`,
  javascript: `// Activity Selection using Greedy Algorithm
function activitySelection(activities) {
  // activities: array of objects {start, finish, id}
  // Sort activities by finish time
  const sortedActivities = activities.slice().sort((a, b) => a.finish - b.finish);
  
  const selected = [];
  let lastFinishTime = 0;
  
  for (const activity of sortedActivities) {
    // If this activity starts after the last selected activity finishes
    if (activity.start >= lastFinishTime) {
      selected.push(activity);
      lastFinishTime = activity.finish;
    }
  }
  
  return selected;
}

// Version with separate start and finish arrays
function activitySelectionArrays(start, finish) {
  const n = start.length;
  
  // Create array of activities with indices
  const activities = start.map((s, i) => ({
    start: s,
    finish: finish[i],
    index: i
  }));
  
  // Sort by finish time
  activities.sort((a, b) => a.finish - b.finish);
  
  const selected = [];
  let lastFinish = 0;
  
  for (const activity of activities) {
    if (activity.start >= lastFinish) {
      selected.push(activity.index);
      lastFinish = activity.finish;
    }
  }
  
  return selected;
}

// With detailed logging
function activitySelectionDetailed(activities) {
  const sortedActivities = activities.slice().sort((a, b) => a.finish - b.finish);
  
  const selected = [];
  let lastFinishTime = 0;
  
  console.log("Activities sorted by finish time:");
  sortedActivities.forEach((activity, i) => {
    console.log(\`Activity \${activity.id}: (\${activity.start}, \${activity.finish})\`);
  });
  
  console.log("\\nSelection process:");
  for (const activity of sortedActivities) {
    if (activity.start >= lastFinishTime) {
      selected.push(activity);
      console.log(\`Selected Activity \${activity.id}: (\${activity.start}, \${activity.finish})\`);
      lastFinishTime = activity.finish;
    } else {
      console.log(\`Rejected Activity \${activity.id}: (\${activity.start}, \${activity.finish}) - conflicts\`);
    }
  }
  
  return { selected, count: selected.length };
}`,
  typescript: `// Activity interface
interface Activity {
  start: number;
  finish: number;
  id: string | number;
}

// Activity Selection using Greedy Algorithm
function activitySelection(activities: Activity[]): Activity[] {
  // Sort activities by finish time
  const sortedActivities = [...activities].sort((a, b) => a.finish - b.finish);
  
  const selected: Activity[] = [];
  let lastFinishTime = 0;
  
  for (const activity of sortedActivities) {
    // If this activity starts after the last selected activity finishes
    if (activity.start >= lastFinishTime) {
      selected.push(activity);
      lastFinishTime = activity.finish;
    }
  }
  
  return selected;
}

// Version with separate start and finish arrays
function activitySelectionArrays(start: number[], finish: number[]): number[] {
  const n = start.length;
  
  // Create array of activities with indices
  const activities: Array<{start: number, finish: number, index: number}> = 
    start.map((s, i) => ({
      start: s,
      finish: finish[i],
      index: i
    }));
  
  // Sort by finish time
  activities.sort((a, b) => a.finish - b.finish);
  
  const selected: number[] = [];
  let lastFinish = 0;
  
  for (const activity of activities) {
    if (activity.start >= lastFinish) {
      selected.push(activity.index);
      lastFinish = activity.finish;
    }
  }
  
  return selected;
}

// Result interface for detailed version
interface ActivitySelectionResult {
  selected: Activity[];
  count: number;
  totalActivities: number;
}

// With detailed information
function activitySelectionDetailed(activities: Activity[]): ActivitySelectionResult {
  const sortedActivities = [...activities].sort((a, b) => a.finish - b.finish);
  
  const selected: Activity[] = [];
  let lastFinishTime = 0;
  
  console.log("Activities sorted by finish time:");
  sortedActivities.forEach((activity, i) => {
    console.log(\`Activity \${activity.id}: (\${activity.start}, \${activity.finish})\`);
  });
  
  console.log("\\nSelection process:");
  for (const activity of sortedActivities) {
    if (activity.start >= lastFinishTime) {
      selected.push(activity);
      console.log(\`Selected Activity \${activity.id}: (\${activity.start}, \${activity.finish})\`);
      lastFinishTime = activity.finish;
    } else {
      console.log(\`Rejected Activity \${activity.id}: (\${activity.start}, \${activity.finish}) - conflicts\`);
    }
  }
  
  return {
    selected,
    count: selected.length,
    totalActivities: activities.length
  };
}`,

  java: `import java.util.*;

public class ActivitySelection {
    
    // Activity class to represent an activity
    static class Activity {
        int start, finish, id;
        
        Activity(int start, int finish, int id) {
            this.start = start;
            this.finish = finish;
            this.id = id;
        }
    }
    
    // Activity Selection using Greedy Algorithm
    public static List<Activity> activitySelection(List<Activity> activities) {
        // Sort activities by finish time
        activities.sort((a, b) -> Integer.compare(a.finish, b.finish));
        
        List<Activity> selected = new ArrayList<>();
        int lastFinishTime = 0;
        
        for (Activity activity : activities) {
            // If this activity starts after the last selected activity finishes
            if (activity.start >= lastFinishTime) {
                selected.add(activity);
                lastFinishTime = activity.finish;
            }
        }
        
        return selected;
    }
    
    // Version with separate start and finish arrays
    public static List<Integer> activitySelectionArrays(int[] start, int[] finish) {
        int n = start.length;
        
        // Create list of activities with indices
        List<Activity> activities = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            activities.add(new Activity(start[i], finish[i], i));
        }
        
        // Sort by finish time
        activities.sort((a, b) -> Integer.compare(a.finish, b.finish));
        
        List<Integer> selected = new ArrayList<>();
        int lastFinish = 0;
        
        for (Activity activity : activities) {
            if (activity.start >= lastFinish) {
                selected.add(activity.id);
                lastFinish = activity.finish;
            }
        }
        
        return selected;
    }
    
    // With detailed logging
    public static void activitySelectionDetailed(List<Activity> activities) {
        activities.sort((a, b) -> Integer.compare(a.finish, b.finish));
        
        List<Activity> selected = new ArrayList<>();
        int lastFinishTime = 0;
        
        System.out.println("Activities sorted by finish time:");
        for (Activity activity : activities) {
            System.out.println("Activity " + activity.id + ": (" + activity.start + ", " + activity.finish + ")");
        }
        
        System.out.println("\\nSelection process:");
        for (Activity activity : activities) {
            if (activity.start >= lastFinishTime) {
                selected.add(activity);
                System.out.println("Selected Activity " + activity.id + ": (" + activity.start + ", " + activity.finish + ")");
                lastFinishTime = activity.finish;
            } else {
                System.out.println("Rejected Activity " + activity.id + ": (" + activity.start + ", " + activity.finish + ") - conflicts");
            }
        }
        
        System.out.println("\\nTotal selected activities: " + selected.size());
    }
}`,

  cpp: `#include <iostream>
#include <vector>
#include <algorithm>

struct Activity {
    int start, finish, id;
    
    Activity(int s, int f, int i) : start(s), finish(f), id(i) {}
};

class ActivitySelection {
public:
    // Activity Selection using Greedy Algorithm
    static std::vector<Activity> activitySelection(std::vector<Activity>& activities) {
        // Sort activities by finish time
        std::sort(activities.begin(), activities.end(), 
                 [](const Activity& a, const Activity& b) {
                     return a.finish < b.finish;
                 });
        
        std::vector<Activity> selected;
        int lastFinishTime = 0;
        
        for (const auto& activity : activities) {
            // If this activity starts after the last selected activity finishes
            if (activity.start >= lastFinishTime) {
                selected.push_back(activity);
                lastFinishTime = activity.finish;
            }
        }
        
        return selected;
    }
    
    // Version with separate start and finish arrays
    static std::vector<int> activitySelectionArrays(const std::vector<int>& start, 
                                                    const std::vector<int>& finish) {
        int n = start.size();
        
        // Create vector of activities with indices
        std::vector<Activity> activities;
        for (int i = 0; i < n; i++) {
            activities.emplace_back(start[i], finish[i], i);
        }
        
        // Sort by finish time
        std::sort(activities.begin(), activities.end(), 
                 [](const Activity& a, const Activity& b) {
                     return a.finish < b.finish;
                 });
        
        std::vector<int> selected;
        int lastFinish = 0;
        
        for (const auto& activity : activities) {
            if (activity.start >= lastFinish) {
                selected.push_back(activity.id);
                lastFinish = activity.finish;
            }
        }
        
        return selected;
    }
    
    // With detailed logging
    static void activitySelectionDetailed(std::vector<Activity>& activities) {
        std::sort(activities.begin(), activities.end(), 
                 [](const Activity& a, const Activity& b) {
                     return a.finish < b.finish;
                 });
        
        std::vector<Activity> selected;
        int lastFinishTime = 0;
        
        std::cout << "Activities sorted by finish time:\\n";
        for (const auto& activity : activities) {
            std::cout << "Activity " << activity.id << ": (" 
                     << activity.start << ", " << activity.finish << ")\\n";
        }
        
        std::cout << "\\nSelection process:\\n";
        for (const auto& activity : activities) {
            if (activity.start >= lastFinishTime) {
                selected.push_back(activity);
                std::cout << "Selected Activity " << activity.id << ": (" 
                         << activity.start << ", " << activity.finish << ")\\n";
                lastFinishTime = activity.finish;
            } else {
                std::cout << "Rejected Activity " << activity.id << ": (" 
                         << activity.start << ", " << activity.finish << ") - conflicts\\n";
            }
        }
        
        std::cout << "\\nTotal selected activities: " << selected.size() << std::endl;
    }
};`,

  csharp: `using System;
using System.Collections.Generic;
using System.Linq;

public class Activity 
{
    public int Start { get; set; }
    public int Finish { get; set; }
    public int Id { get; set; }
    
    public Activity(int start, int finish, int id) 
    {
        Start = start;
        Finish = finish;
        Id = id;
    }
}

public class ActivitySelection 
{
    // Activity Selection using Greedy Algorithm
    public static List<Activity> SelectActivities(List<Activity> activities) 
    {
        // Sort activities by finish time
        var sortedActivities = activities.OrderBy(a => a.Finish).ToList();
        
        List<Activity> selected = new List<Activity>();
        int lastFinishTime = 0;
        
        foreach (var activity in sortedActivities) 
        {
            // If this activity starts after the last selected activity finishes
            if (activity.Start >= lastFinishTime) 
            {
                selected.Add(activity);
                lastFinishTime = activity.Finish;
            }
        }
        
        return selected;
    }
    
    // Version with separate start and finish arrays
    public static List<int> SelectActivitiesArrays(int[] start, int[] finish) 
    {
        int n = start.Length;
        
        // Create list of activities with indices
        var activities = new List<Activity>();
        for (int i = 0; i < n; i++) 
        {
            activities.Add(new Activity(start[i], finish[i], i));
        }
        
        // Sort by finish time
        var sortedActivities = activities.OrderBy(a => a.Finish).ToList();
        
        List<int> selected = new List<int>();
        int lastFinish = 0;
        
        foreach (var activity in sortedActivities) 
        {
            if (activity.Start >= lastFinish) 
            {
                selected.Add(activity.Id);
                lastFinish = activity.Finish;
            }
        }
        
        return selected;
    }
    
    // With detailed logging
    public static void SelectActivitiesDetailed(List<Activity> activities) 
    {
        var sortedActivities = activities.OrderBy(a => a.Finish).ToList();
        
        List<Activity> selected = new List<Activity>();
        int lastFinishTime = 0;
        
        Console.WriteLine("Activities sorted by finish time:");
        foreach (var activity in sortedActivities) 
        {
            Console.WriteLine($"Activity {activity.Id}: ({activity.Start}, {activity.Finish})");
        }
        
        Console.WriteLine("\\nSelection process:");
        foreach (var activity in sortedActivities) 
        {
            if (activity.Start >= lastFinishTime) 
            {
                selected.Add(activity);
                Console.WriteLine($"Selected Activity {activity.Id}: ({activity.Start}, {activity.Finish})");
                lastFinishTime = activity.Finish;
            } 
            else 
            {
                Console.WriteLine($"Rejected Activity {activity.Id}: ({activity.Start}, {activity.Finish}) - conflicts");
            }
        }
        
        Console.WriteLine($"\\nTotal selected activities: {selected.Count}");
    }
}`,

  php: `<?php
class Activity {
    public $start;
    public $finish;
    public $id;
    
    public function __construct($start, $finish, $id) {
        $this->start = $start;
        $this->finish = $finish;
        $this->id = $id;
    }
}

class ActivitySelection {
    // Activity Selection using Greedy Algorithm
    public static function activitySelection($activities) {
        // Sort activities by finish time
        usort($activities, function($a, $b) {
            return $a->finish - $b->finish;
        });
        
        $selected = [];
        $lastFinishTime = 0;
        
        foreach ($activities as $activity) {
            // If this activity starts after the last selected activity finishes
            if ($activity->start >= $lastFinishTime) {
                $selected[] = $activity;
                $lastFinishTime = $activity->finish;
            }
        }
        
        return $selected;
    }
    
    // Version with separate start and finish arrays
    public static function activitySelectionArrays($start, $finish) {
        $n = count($start);
        
        // Create array of activities with indices
        $activities = [];
        for ($i = 0; $i < $n; $i++) {
            $activities[] = new Activity($start[$i], $finish[$i], $i);
        }
        
        // Sort by finish time
        usort($activities, function($a, $b) {
            return $a->finish - $b->finish;
        });
        
        $selected = [];
        $lastFinish = 0;
        
        foreach ($activities as $activity) {
            if ($activity->start >= $lastFinish) {
                $selected[] = $activity->id;
                $lastFinish = $activity->finish;
            }
        }
        
        return $selected;
    }
    
    // With detailed logging
    public static function activitySelectionDetailed($activities) {
        usort($activities, function($a, $b) {
            return $a->finish - $b->finish;
        });
        
        $selected = [];
        $lastFinishTime = 0;
        
        echo "Activities sorted by finish time:\\n";
        foreach ($activities as $activity) {
            echo "Activity {$activity->id}: ({$activity->start}, {$activity->finish})\\n";
        }
        
        echo "\\nSelection process:\\n";
        foreach ($activities as $activity) {
            if ($activity->start >= $lastFinishTime) {
                $selected[] = $activity;
                echo "Selected Activity {$activity->id}: ({$activity->start}, {$activity->finish})\\n";
                $lastFinishTime = $activity->finish;
            } else {
                echo "Rejected Activity {$activity->id}: ({$activity->start}, {$activity->finish}) - conflicts\\n";
            }
        }
        
        echo "\\nTotal selected activities: " . count($selected) . "\\n";
        
        return $selected;
    }
}
?>`,

  ruby: `class Activity
  attr_accessor :start, :finish, :id
  
  def initialize(start, finish, id)
    @start = start
    @finish = finish
    @id = id
  end
end

class ActivitySelection
  # Activity Selection using Greedy Algorithm
  def self.activity_selection(activities)
    # Sort activities by finish time
    sorted_activities = activities.sort_by(&:finish)
    
    selected = []
    last_finish_time = 0
    
    sorted_activities.each do |activity|
      # If this activity starts after the last selected activity finishes
      if activity.start >= last_finish_time
        selected << activity
        last_finish_time = activity.finish
      end
    end
    
    selected
  end
  
  # Version with separate start and finish arrays
  def self.activity_selection_arrays(start_times, finish_times)
    n = start_times.length
    
    # Create array of activities with indices
    activities = []
    (0...n).each do |i|
      activities << Activity.new(start_times[i], finish_times[i], i)
    end
    
    # Sort by finish time
    activities.sort_by!(&:finish)
    
    selected = []
    last_finish = 0
    
    activities.each do |activity|
      if activity.start >= last_finish
        selected << activity.id
        last_finish = activity.finish
      end
    end
    
    selected
  end
  
  # With detailed logging
  def self.activity_selection_detailed(activities)
    sorted_activities = activities.sort_by(&:finish)
    
    selected = []
    last_finish_time = 0
    
    puts "Activities sorted by finish time:"
    sorted_activities.each do |activity|
      puts "Activity #{activity.id}: (#{activity.start}, #{activity.finish})"
    end
    
    puts "\\nSelection process:"
    sorted_activities.each do |activity|
      if activity.start >= last_finish_time
        selected << activity
        puts "Selected Activity #{activity.id}: (#{activity.start}, #{activity.finish})"
        last_finish_time = activity.finish
      else
        puts "Rejected Activity #{activity.id}: (#{activity.start}, #{activity.finish}) - conflicts"
      end
    end
    
    puts "\\nTotal selected activities: #{selected.length}"
    
    selected
  end
end`,

  swift: `import Foundation

struct Activity {
    let start: Int
    let finish: Int
    let id: Int
}

class ActivitySelection {
    // Activity Selection using Greedy Algorithm
    static func activitySelection(_ activities: [Activity]) -> [Activity] {
        // Sort activities by finish time
        let sortedActivities = activities.sorted { $0.finish < $1.finish }
        
        var selected: [Activity] = []
        var lastFinishTime = 0
        
        for activity in sortedActivities {
            // If this activity starts after the last selected activity finishes
            if activity.start >= lastFinishTime {
                selected.append(activity)
                lastFinishTime = activity.finish
            }
        }
        
        return selected
    }
    
    // Version with separate start and finish arrays
    static func activitySelectionArrays(start: [Int], finish: [Int]) -> [Int] {
        let n = start.count
        
        // Create array of activities with indices
        var activities: [Activity] = []
        for i in 0..<n {
            activities.append(Activity(start: start[i], finish: finish[i], id: i))
        }
        
        // Sort by finish time
        activities.sort { $0.finish < $1.finish }
        
        var selected: [Int] = []
        var lastFinish = 0
        
        for activity in activities {
            if activity.start >= lastFinish {
                selected.append(activity.id)
                lastFinish = activity.finish
            }
        }
        
        return selected
    }
    
    // With detailed logging
    static func activitySelectionDetailed(_ activities: [Activity]) -> [Activity] {
        let sortedActivities = activities.sorted { $0.finish < $1.finish }
        
        var selected: [Activity] = []
        var lastFinishTime = 0
        
        print("Activities sorted by finish time:")
        for activity in sortedActivities {
            print("Activity \\(activity.id): (\\(activity.start), \\(activity.finish))")
        }
        
        print("\\nSelection process:")
        for activity in sortedActivities {
            if activity.start >= lastFinishTime {
                selected.append(activity)
                print("Selected Activity \\(activity.id): (\\(activity.start), \\(activity.finish))")
                lastFinishTime = activity.finish
            } else {
                print("Rejected Activity \\(activity.id): (\\(activity.start), \\(activity.finish)) - conflicts")
            }
        }
        
        print("\\nTotal selected activities: \\(selected.count)")
        
        return selected
    }
}`,

  go: `package main

import (
    "fmt"
    "sort"
)

type Activity struct {
    Start  int
    Finish int
    ID     int
}

// Activity Selection using Greedy Algorithm
func activitySelection(activities []Activity) []Activity {
    // Sort activities by finish time
    sort.Slice(activities, func(i, j int) bool {
        return activities[i].Finish < activities[j].Finish
    })
    
    var selected []Activity
    lastFinishTime := 0
    
    for _, activity := range activities {
        // If this activity starts after the last selected activity finishes
        if activity.Start >= lastFinishTime {
            selected = append(selected, activity)
            lastFinishTime = activity.Finish
        }
    }
    
    return selected
}

// Version with separate start and finish arrays
func activitySelectionArrays(start, finish []int) []int {
    n := len(start)
    
    // Create slice of activities with indices
    activities := make([]Activity, n)
    for i := 0; i < n; i++ {
        activities[i] = Activity{Start: start[i], Finish: finish[i], ID: i}
    }
    
    // Sort by finish time
    sort.Slice(activities, func(i, j int) bool {
        return activities[i].Finish < activities[j].Finish
    })
    
    var selected []int
    lastFinish := 0
    
    for _, activity := range activities {
        if activity.Start >= lastFinish {
            selected = append(selected, activity.ID)
            lastFinish = activity.Finish
        }
    }
    
    return selected
}

// With detailed logging
func activitySelectionDetailed(activities []Activity) []Activity {
    // Sort activities by finish time
    sort.Slice(activities, func(i, j int) bool {
        return activities[i].Finish < activities[j].Finish
    })
    
    var selected []Activity
    lastFinishTime := 0
    
    fmt.Println("Activities sorted by finish time:")
    for _, activity := range activities {
        fmt.Printf("Activity %d: (%d, %d)\\n", activity.ID, activity.Start, activity.Finish)
    }
    
    fmt.Println("\\nSelection process:")
    for _, activity := range activities {
        if activity.Start >= lastFinishTime {
            selected = append(selected, activity)
            fmt.Printf("Selected Activity %d: (%d, %d)\\n", activity.ID, activity.Start, activity.Finish)
            lastFinishTime = activity.Finish
        } else {
            fmt.Printf("Rejected Activity %d: (%d, %d) - conflicts\\n", activity.ID, activity.Start, activity.Finish)
        }
    }
    
    fmt.Printf("\\nTotal selected activities: %d\\n", len(selected))
    
         return selected
 }`
} 