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
