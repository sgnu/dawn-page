<script>
export default {
    name: 'Clock',
    props: {
        propSettings: Object
    },
    data() {
        return {
            dateTime: {
                dateObject: undefined,
                year: 0,
                month: '',
                date: 0,
                weekday: '',
                hours: 0,
                minutes: 0,
                seconds: 0
            },
            timer: undefined,
            settings: this.propSettings
        }
    },
    methods: {
        setDateTime() {
            this.dateTime.dateObject = new Date()
            this.dateTime.year = this.dateTime.dateObject.getFullYear()
            this.dateTime.month = new Intl.DateTimeFormat('en-us', { month: 'long' }).format(this.dateTime.dateObject.getMonth())
            this.dateTime.date = this.dateTime.dateObject.getDate()
            this.dateTime.weekday = new Intl.DateTimeFormat('en-us', { weekday: 'long' }).format(this.dateTime.dateObject.getDay())
            this.dateTime.hours = this.dateTime.dateObject.getHours()
            this.dateTime.minutes = this.dateTime.dateObject.getMinutes() < 10 ? `0${this.dateTime.dateObject.getMinutes()}` : this.dateTime.dateObject.getMinutes()
            this.dateTime.seconds = this.dateTime.dateObject.getSeconds() < 10 ? `0${this.dateTime.dateObject.getSeconds()}` : this.dateTime.dateObject.getSeconds()
        }
    },
    computed: {
        getTime() {
            const timeSettings = {
                hour: 'numeric',
                hour12: !this.settings.clock.twentyFourHours,
                minute: 'numeric'
            }
            if (this.settings.clock.showSeconds) {
                timeSettings.second = 'numeric'
            }
            return this.dateTime.dateObject.toLocaleString(navigator.language, timeSettings)
        },
        getHours() {
            return this.dateTime.dateObject.toLocaleString(navigator.language, { hour: 'numeric', hour12: !this.settings.clock.twentyFourHours })
        }
    },
    created() {
        this.setDateTime()
        this.timer = setInterval(this.setDateTime, 1000)
    },
    beforeUnmount() {
        clearInterval(this.timer)
    }
}
</script>

<template>
    <div>
        <h1>{{getTime}}</h1>
        <p>{{dateTime.weekday}} {{dateTime.month}} {{dateTime.date}}, {{dateTime.year}}</p>
    </div>
</template>

<style scoped>
div {
    background-color: var(--ctp-mocha-base);
    border-radius: 8px;
    box-sizing: border-box;
    box-shadow: 2px 2px 8px 4px rgba(0,0,0, 0.25);

    text-align: center;

    padding: 16px;
}

h1 {
    color: var(--ctp-mocha-blue);
    margin: 0;
}

p {
    color: var(--ctp-mocha-subtext0);
    margin: 0;
}
</style>