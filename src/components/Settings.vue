<script>
export default {
    name: 'Settings',
    emits: ['hideSettings'],
    props: {
        propSettings: Object
    },
    data() {
        return {
            settings: this.propSettings
        }
    },
    methods: {
        hiddenFieldFocused(element) {
            element.target.type = 'text'
        },

        hiddenFieldBlurred(element) {
            element.target.type = 'password'
        }
    }
}
</script>

<template>
    <div class="settings-container" @click="$emit('hideSettings', false)">
        <Transition appear>
            <div class="settings-inner-shape" @click.stop="">
                <h1>Clock</h1>
                <div class="setting">
                    <span class="setting-label">Enable clock</span>
                    <label class="switch">
                        <input type="checkbox" v-model="settings.clock.enabled" />
                        <span class="slider"></span>
                    </label>
                </div>
                <div class="setting">
                    <span class="setting-label">Show seconds</span>
                    <label class="switch">
                        <input type="checkbox" v-model="settings.clock.showSeconds" />
                        <span class="slider"></span>
                    </label>
                </div>
                <div class="setting">
                    <span class="setting-label">Use 24-hour format</span>
                    <label class="switch">
                        <input type="checkbox" v-model="settings.clock.twentyFourHours" />
                        <span class="slider"></span>
                    </label>
                </div>

                <h1>Notes</h1>
                <div class="setting">
                    <span class="setting-label">Enable notes</span>
                    <label class="switch">
                        <input type="checkbox" v-model="settings.notes.enabled" />
                        <span class="slider"></span>
                    </label>
                </div>

                <h1>Weather</h1>
                <div class="setting">
                    <span class="setting-label">Enable weather</span>
                    <label class="switch">
                        <input type="checkbox" v-model="settings.weather.enabled" />
                        <span class="slider"></span>
                    </label>
                </div>
                <div class="setting">
                    <label class="label-text">API Key <a href="https://openweathermap.org/" target="_blank">(?)</a></label>
                    <input type="password" v-model="settings.weather.apiKey"
                    @blur="hiddenFieldBlurred"
                    @focus="hiddenFieldFocused"/>
                </div>
                <div class="setting">
                    <label class="label-text">Location <a href="https://openweathermap.org/current#name" target="_blank">(?)</a></label>
                    <input type="text"
                    v-model="settings.weather.locationData" />
                </div>
                <div class="setting">
                    <span class="setting-label">Use imperial</span>
                    <label class="switch">
                        <input type="checkbox" v-model="settings.weather.useImperial" />
                        <span class="slider"></span>
                    </label>
                </div>

                <h1>AniList</h1>
                <div class="setting">
                    <span class="setting-label">Enable AniList</span>
                    <label class="switch">
                        <input type="checkbox" v-model="settings.anime.enabled" />
                        <span class="slider"></span>
                    </label>
                </div>
                <div class="setting">
                    <label class="label-text">Username</label>
                    <input type="text"
                    v-model="settings.anime.userName" />
                </div>

            </div>
        </Transition>
    </div>
</template>

<style scoped>
.settings-container {
    background-color: rgba(0, 0, 0, 0.67);
    display: flex;
    align-items: center;
    justify-content: center;

    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;

    z-index: 11;
}

.settings-inner-shape {
    background-color: var(--ctp-mocha-base);
    border-radius: 8px;
    box-shadow: 2px 0px 12px 0px rgba(0, 0, 0, 0.33),
        4px 8px 24px 2px rgba(0, 0, 0, 0.167);

    position: relative;
    width: 320px;

    translate: 0;

    display: flex;
    flex-direction: column;
    align-items: center;

    padding: 16px;

    z-index: 12;
}

.setting {
    width: 100%;
    margin-bottom: 4px;
}

input[type="password"],
input[type="text"] {
    float: right;
    border-bottom: 2px solid var(--ctp-mocha-subtext0);

    color: var(--ctp-mocha-subtext0);

    margin-bottom: 4px;

    transition: all 0.167s ease-out;
}

input[type="password"]:focus,
input[type="text"]:focus {
    border-color: var(--ctp-mocha-blue);
    color: var(--ctp-mocha-blue);
}

h1 {
    color: var(--ctp-mocha-text);
    font-size: 24px;

    margin: 0;
    margin-bottom: 8px;
}

.setting-label {
    color: var(--ctp-mocha-subtext1);
    float: left;

    line-height: 24px;
    margin-right: 8px;
}

.label-text {
    color: var(--ctp-mocha-subtext1);
}

a {
    color: var(--ctp-mocha-blue);
    border-bottom: 1px dashed var(--ctp-mocha-blue);
    text-decoration: none;
}

.switch {
    float: right;
    position: relative;
    /* display: inline-block; */
    width: 40px;
    height: 24px;
}

.switch input {
    opacity: 0;
    width: 0;
    height: 0;
}

.slider {
    position: absolute;
    cursor: pointer;
    border-radius: 24px;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--ctp-mocha-overlay0);
    transition: .167s;
}

.slider:before {
    position: absolute;
    border-radius: 50%;
    content: "";
    height: 16px;
    width: 16px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: .167s ease-out;
}

input:checked+.slider {
    background-color: #2196F3;
}

input:focus+.slider {
    box-shadow: 0 0 1px #2196F3;
}

input:checked+.slider:before {
    -webkit-transform: translateX(16px);
    -ms-transform: translateX(16px);
    transform: translateX(16px);
}

.slider.round {
    border-radius: 24px;
}

.slider.round:before {
    border-radius: 50%;
}
</style>