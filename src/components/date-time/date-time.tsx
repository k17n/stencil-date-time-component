import { Component, Prop, h, State } from '@stencil/core';
@Component({
    tag: 'date-time',
    styleUrl: 'date-time.scss',
    shadow: true,
})
export class dateTime {

    /**
    *  Timezone in which the date and time should be shown. Default is browser timezone.
    */
    @Prop() timeZone: string = Intl.DateTimeFormat().resolvedOptions().timeZone;

    /**
    *  Should the time keep updating. Default is `false`
    */
    @Prop() shouldUpdate: boolean = false;

    /**
    *  Should the clock be shown. Default is `false`
    */
    @Prop() showClock: boolean = false;

    @State() time: number = Date.now();

    private locale: string = Intl.DateTimeFormat().resolvedOptions().locale;
    private updateInterval: number = 1000;
    private timer: number;

    private getDateTimeJSON(time: number): any {
        const currentDateString = new Date(time);
        const dateTimeJson = {
            date: currentDateString.toLocaleDateString(this.locale, { timeZone: this.timeZone }),
            time: currentDateString.toLocaleTimeString(this.locale, { timeZone: this.timeZone }),
            timeZone: this.timeZone
        }
        return dateTimeJson;
    }

    connectedCallback() {
        if (this.shouldUpdate) {
            this.timer = window.setInterval(() => {
                this.time = Date.now();
            }, this.updateInterval);
        }
    }

    disconnectedCallback() {
        window.clearInterval(this.timer);
    }

    render() {
        const dateTimeJson = this.getDateTimeJSON(this.time);
        const showClock = this.showClock;
        if (showClock) {
            return (
                <div class="date-time">
                    <analog-clock time={this.time} timeZone={this.timeZone}></analog-clock>
                    <div><b>Date:</b> <time>{dateTimeJson.date}</time></div>
                    <div><b>Time:</b> <time>{dateTimeJson.time}</time></div>
                    <div><b>Time Zone:</b> {dateTimeJson.timeZone}</div>
                </div>
            );
        }
        else {
            return (
                <div class="date-time">
                    <div><b>Date:</b> <time>{dateTimeJson.date}</time></div>
                    <div><b>Time:</b> <time>{dateTimeJson.time}</time></div>
                    <div><b>Time Zone:</b> {dateTimeJson.timeZone}</div>
                </div>
            );
        }
    }
}
