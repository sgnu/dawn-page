<script>
export default {
    name: 'Clock',
    props: {
        propSettings: Object
    },
    data() {
        return {
            dateObject: undefined,
            timer: undefined,
            settings: this.propSettings
        }
    },
    methods: {
        setDateTime() {
            this.dateObject = new Date()
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
            return this.dateObject.toLocaleString(navigator.language, timeSettings)
        },
        getDate() {
            const dateSettings = {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }
            return this.dateObject.toLocaleString(navigator.language, dateSettings)
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
        <p>{{getDate}}</p>
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