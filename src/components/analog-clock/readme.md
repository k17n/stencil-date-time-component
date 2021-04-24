# analog-clock



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute   | Description                                                                       | Type     | Default                                            |
| ---------- | ----------- | --------------------------------------------------------------------------------- | -------- | -------------------------------------------------- |
| `time`     | `time`      | Time to be displayed in the clock.                                                | `number` | `Date.now()`                                       |
| `timeZone` | `time-zone` | Timezone in which the date and time should be shown. Default is browser timezone. | `string` | `Intl.DateTimeFormat().resolvedOptions().timeZone` |


## Dependencies

### Used by

 - [date-time](../date-time)

### Graph
```mermaid
graph TD;
  date-time --> analog-clock
  style analog-clock fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
