<template>
    <div class='demo-app'>
        <FullCalendar
            class='demo-app-calendar'
            ref='fullCalendar'
            defaultView='dayGridMonth'
            :plugins='calendarPlugins'
            :events='calendarEvents'
            :defaultDate='calendarDefaultDate'
        />
    </div>
</template>

<script>
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'

export default {
    components: {
        FullCalendar
    },
    data: function() {
        return {
            calendarPlugins: [
                dayGridPlugin,
            ],
            calendarEvents: [
                {
                    title: 'Event Now',
                    start: new Date()
                }
            ],
            calendarDefaultDate: '2019-04-27'
        }
    },
}
</script>

</script>

<style>
@import '~@fullcalendar/core/main.css';
@import '~@fullcalendar/daygrid/main.css';


.demo-app-calendar {
    margin: 0 auto;
    max-width: 900px;
}
</style>