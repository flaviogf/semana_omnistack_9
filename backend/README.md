### User

**Properties**

| Properties | Type   |
|------------|--------|
| email      | String |

### Spot

**Properties**

| Properties     | Type     |
|----------------|----------|
| thumbnail      | String   |
| company        | String   |
| price          | Number   |
| techs          | [String] |
| user           | ObjectId |

### Booking

**Properties**

| Properties | Type     |
|------------|----------|
| date       | Date     |
| approved   | Boolean  |
| user       | ObjectId |
| spot       | ObjectId |
