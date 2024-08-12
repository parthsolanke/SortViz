package sorter

type SortStep struct {
	Array []int `json:"array"`
}

// BubbleSort performs a simple bubble sort and returns each step of the process.
func BubbleSort(arr []int) []SortStep {
	var steps []SortStep
	n := len(arr)

	for i := 0; i < n-1; i++ {
		for j := 0; j < n-i-1; j++ {
			if arr[j] > arr[j+1] {
				arr[j], arr[j+1] = arr[j+1], arr[j]
			}
			steps = append(steps, SortStep{Array: append([]int(nil), arr...)})
		}
	}

	return steps
}
