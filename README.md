# To dev
### Build/run the android app:
Connect an android device. From mobile dir, run
`adb reverse tcp:8081 tcp:8081`
`react-native run-android`

### Turn on the api server and db server
From the server dir, run
`npm run dev`

# TODO

## Mobile app
- create events
- sends text invites to contacts added to event
- receives push notifications about RSVPs

## Web app
- displays events for invitees
- accepts RSVPs for invitees

## Backend
- stores events
- push notifications to event creator
