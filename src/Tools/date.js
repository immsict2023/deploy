export const convertDate = (date) => {
    return new Date(date).toLocaleDateString(undefined, { month: '2-digit', day: '2-digit', year: 'numeric' })
}

export const convertDateWTime = (date) => {
    const dateTime = new Date(date)
    var str = ''
    if (dateTime.getHours() < 12) {
        str = 'AM'
    } else {
        str = 'PM'
    }
    if (dateTime) {
        return `${dateTime.getDate()}/${dateTime.getMonth() + 1}/${dateTime.getFullYear()} ${dateTime.getHours()}:${dateTime.getMinutes()} ${str}`
    } else {
        return `-`;
    }
    
}


export const defaultDateInputValue = (date) => {
    if (typeof date !== 'string' || !date.includes('T')) {
        return '';
    }
    return date.split('T')[0];
}

export const addTimeToMilitaryTime = (militaryTime, duration) => {
    
    function militaryTo12Hour(militaryTime) {
        const [hours, minutes, seconds] = militaryTime.split(':').map(Number);
        const period = hours >= 12 ? 'pm' : 'am';
        const hour12 = hours % 12 || 12; 
        return `${hour12}:${minutes.toString().padStart(2, '0')}${period}`;
    }

    // Convert 12-hour clock format to minutes
    function timeToMinutes(time) {
        const [hour, minutes] = time.split(':').map(Number);
        return hour * 60 + minutes;
    }
    
    function minutesToTime(minutes) {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        const period = hours >= 12 ? 'pm' : 'am';
        const hour12 = hours % 12 || 12; 
        return `${hour12}:${mins.toString().padStart(2, '0')}${period}`;
    }

    const initialTime = militaryTo12Hour(militaryTime);
    const initialMinutes = timeToMinutes(militaryTime);
    const newTimeMinutes = initialMinutes + duration * 60;
    const newTime = minutesToTime(newTimeMinutes);

    return `${initialTime} - ${newTime}`;
}

export const  militaryToStandardTime = (militaryTime) => {
    
    var timeParts = militaryTime.split(':');
    var hours = parseInt(timeParts[0], 10);
    var minutes = parseInt(timeParts[1], 10);
    
    var meridiem = (hours >= 12) ? 'PM' : 'AM';
    
    hours = (hours > 12) ? hours - 12 : hours;
    hours = (hours === 0) ? 12 : hours;
    
    hours = (hours < 10) ? '0' + hours : hours;
    minutes = (minutes < 10) ? '0' + minutes : minutes;
    
    return hours + ':' + minutes + ' ' + meridiem;
}

export const getAcademicYear = () => {
    return new Promise((resolve, reject) => {
        try {
            let date = []

            for(let i = new Date().getFullYear() + 1; i > 2015; i--) {
                date.push(`${i-1}-${i}`)
            }

            resolve(date)
        } catch(err) {
            reject(err)
        }
    })
}

export const dateDefaultInput = (dateString) => {
    const date = new Date(dateString);
    
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}


export const todayDateInput = () => {
    var now = new Date();

    // Format the date and time to YYYY-MM-DDTHH:MM format
    var year = now.getFullYear();
    var month = String(now.getMonth() + 1).padStart(2, '0'); // January is 0
    var day = String(now.getDate()).padStart(2, '0');
    var hours = String(now.getHours()).padStart(2, '0');
    var minutes = String(now.getMinutes()).padStart(2, '0');

    // Construct datetime-local value string
    return `${year}-${month}-${day}T${hours}:${minutes}`;
}

export const militaryDateTimeToStandard = (dateFromDB) => {
    var date = new Date(dateFromDB);
    console.log(date)
    // Format the date and time to YYYY-MM-DD H:MM AM/PM format
    var year = date.getFullYear();
    var month = String(date.getMonth() + 1).padStart(2, '0'); // January is 0
    var day = String(date.getDate()).padStart(2, '0');
    var hours = date.getHours();
    var minutes = String(date.getMinutes()).padStart(2, '0');

    var period = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // Convert to 12-hour format and handle midnight (0 hours) as 12

    // Construct datetime value string
    return `${year}-${month}-${day} ${hours}:${minutes} ${period}`;
}

