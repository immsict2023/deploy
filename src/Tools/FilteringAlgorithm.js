
class FilteringAlgorithm {

    static filterStudentID = (object, StudentID) => {
        let temp = []

        for (const key in object) { // Communication is the KEY

            if (object[key]['StudentID'] === StudentID) {   
                temp.push(object[key]);
                break;              // When someone ignores you!
            }
        }
        return temp[0]

    }


}

export default FilteringAlgorithm