<template>
    <div>
        <slot>
            <p><b>Model:</b> {{item.model}}</p>
            <p><b>Manufacturer:</b> {{item.manufacturer}}</p>
            <p><b>Starship Class:</b> {{item.starship_class}}</p>
            <p><b>Pilots: </b>{{pilots}}</p>
        </slot>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'Starship',
    computed: {
        ...mapState(['pilots', 'item'])
    }
}
</script>