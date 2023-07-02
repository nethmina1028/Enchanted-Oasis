# Database Collections

## Admin Notifications

```typescript

{
	_id: ObjectID,
	title: string,
	body: string, // supports markdown
	date: Date,
	badgeText: string, // badge text
	badgeColor: string, // badge color
	seenBy: string[] // array of user ids,
	seenByCount: number // number of users who ave seen this notification
	creatorId: string // id of the user who created this notification
	audience : "Students"| "Faculty" | "Both" // audience of the notification
}
```

## House

```typescript

{
	_id: ObjectID,
	name: string,
	points: number
}
```

## Users

```typescript

{
	_id: ObjectID,
	name: string,
	role: "Student" | "Faculty" | "Admin",
	email: string,
	passwordHash: string,
	house: string,
	profilePicture: string,
	phone: string,
	rollNumber: string,
	admissionYear: number,

	courses: string[], // array of course ids

	notifications: string[], // array of notification ids
	seenNotifications: string[], // array of notification ids
	seenNotificationsCount: number // number of notifications seen by this user
}
```

## Lectures

```typescript

{
	_id: ObjectID,
	courseId: string,
	date: Date,
	attendance: string[], // array of student ids
	attendanceCount: number // number of students present
}
```

## Results

```typescript

{
	_id: ObjectID,
	studentId: string,
	courseId: string,
	components: {
		[componentName: string]: {
			marks: number,
			weightage: string
		}
	},
	gradePoint: number,
	gradeLetter: string
}
```

## Courses

```typescript

{
	_id: ObjectID,
	name: string,
	description:string,
	department: string,
	credits: number,
	schedule:{
		[day:string]:{
			startTime:Date,
			endTime:Date
		}
	}
	faculty: string, // faculty id
	students: string[], // array of student ids
	lectures: string[], // array of lecture ids
	components: {
		[componentName: string]: {
			weightage: number
		}
	}
}
```

## Course Material

```typescript

{
	_id: ObjectID,
	courseId: string,
	title: string,
	body: string, // supports markdown
	date: Date,
	attachments: string[], // array of attachment urls (stored in firebase storage)
	creatorId: string // id of the user who created this notification
}
```

## Course Notifications

```typescript

{
	_id: ObjectID,
	courseId: string,
	title: string,
	body: string, // supports markdown
	date: Date,
	badgeText: string, // badge text
	badgeColor: string, // badge color
	seenBy: string[] // array of user ids,
	seenByCount: number // number of users who ave seen this notification
	creatorId: string // id of the faculty who created this notification
	students: string[], // array of student ids
	faculty: string[] // array of faculty ids
}
```