package sorter

func deepCopyArray(arr []int) []int {
	return append([]int(nil), arr...)
}

func arrayChanged(lastStep, currentStep []int) bool {
	for i := range lastStep {
		if lastStep[i] != currentStep[i] {
			return true
		}
	}
	return false
}

func appendStep(steps []SortStep, arr []int) []SortStep {
	if len(steps) == 0 || arrayChanged(steps[len(steps)-1].Array, arr) {
		steps = append(steps, SortStep{Array: deepCopyArray(arr)})
	}
	return steps
}

func mergeSortHelper(arr []int, steps *[]SortStep) []int {
	if len(arr) <= 1 {
		return arr
	}

	mid := len(arr) / 2
	left := mergeSortHelper(arr[:mid], steps)
	right := mergeSortHelper(arr[mid:], steps)

	merged := merge(left, right)

	*steps = appendStep(*steps, merged)
	return merged
}

func merge(left, right []int) []int {
	result := make([]int, 0, len(left)+len(right))
	i, j := 0, 0

	for i < len(left) && j < len(right) {
		if left[i] < right[j] {
			result = append(result, left[i])
			i++
		} else {
			result = append(result, right[j])
			j++
		}
	}

	result = append(result, left[i:]...)
	result = append(result, right[j:]...)

	return result
}
