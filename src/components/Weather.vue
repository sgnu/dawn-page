<script>
export default {
    name: 'Weather',
    props: {
        weather: Object
    },
    computed: {
        getUnit() {
            return this.weather.useImperial ? '°F' : '°C'
        }
    }
}
</script>

<template>
    <div>
        <h1>{{Math.round(weather.main.temp)}}{{getUnit}}</h1>
        <h2>{{weather.weather[0].main}} in {{weather.name}}</h2>
        <p>{{Math.round(weather.wind.speed)}} mph winds and {{Math.round(weather.main.temp_min)}}{{getUnit}} to {{Math.round(weather.main.temp_max)}}{{getUnit}}</p>
    </div>
</template>

<style scoped>
div {
    background-color: var(--ctp-mocha-base);
    border-radius: 8px;
    box-sizing: border-box;
    box-shadow: 2px 2px  8px 4px rgba(0,0,0, 0.25);

    max-width: 100%;
    padding: 16px;
}

div > * {
    margin: 0;
}

h1 {
    color: var(--ctp-mocha-sky);
    font-size: 24px;
}

h2 {
    color: var(--ctp-mocha-subtext1);
    font-size: 18px;
    font-weight: 400;
}

p {
    color: var(--ctp-mocha-subtext0);
    font-size: 14px;
    font-weight: 300;
}
</style>