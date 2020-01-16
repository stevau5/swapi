<template>
    <div>
        <slot>
            <p><b>Name:</b> {{item.name}}</p>
            <p><b>Birthyear:</b> {{item.birth_year}}</p>
            <p><b>Homeworld:</b> {{homeworld}}</p>
            <p><b>Starships:</b> {{starships}}</p>
        </slot>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'Pilot',
    props: {
        item: {
            type: Object
        }
    },
    computed: {
        ...mapState(['homeworld', 'starships'])
    }
}
</script>