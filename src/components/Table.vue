<template>
    <v-container>
        <v-card>
            <v-card-title>
                <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    :label="$t('ui.label_search')"
                    single-line
                    hide-details
                ></v-text-field>
            </v-card-title>
            <v-card-text class="m-t">
                {{$t('ui.filters.label_uric_acid_levels')}}
                <v-chip @click="setFilter('very_low')" class="ma-1" :color="getColor(0, 'very_low')" dark small>
                    {{$t('ui.filters.level_very_low')}} 0&mdash;50
                </v-chip>
                <v-chip @click="setFilter('low')" class="ma-1" :color="getColor(51, 'low')" dark small>
                    {{$t('ui.filters.level_low')}} 50&mdash;100
                </v-chip>
                <v-chip @click="setFilter('moderate')" class="ma-1" :color="getColor(101, 'moderate')" dark small>
                    {{$t('ui.filters.level_moderate')}} 100&mdash;200
                </v-chip>
                <v-chip @click="setFilter('high')" class="ma-1" :color="getColor(201, 'high')" dark small>
                    {{$t('ui.filters.level_high')}}  200&mdash;300
                </v-chip>
                <v-chip @click="setFilter('very_high')" class="ma-1" :color="getColor(301, 'very_high')" dark small>
                     {{$t('ui.filters.level_very_high')}}  300+
                </v-chip>
            </v-card-text>
            <v-data-table
                :headers="headers"
                :items="filteredItems"
                :items-per-page="200"
                :search="search"
                group-by="type"
                class="elevation-1"
            >
                <template v-slot:item.name="{ item }">
                    <b>{{ item.name }}</b>
                </template>
                <template v-slot:item.total="{ item }">
                    <b>{{ item.total }}</b>
                </template>
                <template v-slot:item.uricAcid="{ item }">
                    <v-chip :color="getColor(item.uricAcid)" dark>
                        <b>{{ item.uricAcid }}</b>
                    </v-chip>
                </template>
                <template v-slot:item.icon="{ item }">
                    <span style="font-size: 1.8rem">{{ item.icon }}</span>
                </template>
            </v-data-table>
        </v-card>
    </v-container>
</template>

<script>
import Foods from "../data/foods.json";
import chroma from 'chroma-js'

export default {
    name: "Table",
    data: () => {
        return {
            foods: Foods,
            foodsPrepared: [],
            search: "",
            filter: null,
            headers: [
                {
                    text: "Icon",
                    value: "icon",
                    sortable: false,
                },
                {
                    text: "Food",
                    align: "start",
                    value: "name",
                },
                {
                    text: "Type",
                    value: "type",
                },
                { text: "Adenine", value: "adenine" },
                { text: "Guanine", value: "guanine" },
                { text: "Hypoxanthine", value: "hypoxanthine" },
                { text: "Xanthine", value: "xanthine" },
                { text: "Total Purines", value: "total" },
                { text: "Uric Acid", value: "uricAcid" },
            ],
        };
    },
    created() {
        this.prepareData();
    },
    methods: {
        setFilter: function(val) {
            if (this.filter === val) {
                this.filter = null
            } else {
                this.filter = val
            }
        },
        prepareData: function () {
            this.foods.forEach((food) => {
                let foodPrepared = {};
                foodPrepared.name = food.name;
                foodPrepared.adenine = food.purines[0].adenine;
                foodPrepared.guanine = food.purines[0].guanine;
                foodPrepared.hypoxanthine = food.purines[0].hypoxanthine;
                foodPrepared.xanthine = food.purines[0].xanthine;
                foodPrepared.total = food.purines[0].total;
                foodPrepared.uricAcid = food.purines[0].uricAcid;
                foodPrepared.type = food.type;
                foodPrepared.icon = food.icon;
                this.foodsPrepared.push(foodPrepared);
            });
        },
        getColor(uricAcid, filterVal) {
            let color = ""

            if (uricAcid > 300) color = "black";
            else if (uricAcid > 200) color = "#760000";
            else if (uricAcid > 100) color = "red";
            else if (uricAcid > 50) color = "orange";
            else color = "green";

            if (filterVal && this.filter && this.filter !== filterVal) {
                return chroma(color).alpha(0.2).hex()
            }

            return color
        },
    },
    computed: {
        filteredItems: function() {
            if (!this.filter) {
                return this.foodsPrepared
            }

            return this.foodsPrepared.filter(item => {
                
                if (this.filter === 'very_low') {
                    return item.uricAcid < 50 
                } else if (this.filter === 'low') {
                    return item.uricAcid >= 50 && item.uricAcid < 100
                } else if (this.filter === 'moderate') {
                    return item.uricAcid >= 100 && item.uricAcid < 200
                } else if (this.filter === 'high') {
                    return item.uricAcid >= 200 && item.uricAcid < 300
                } else if (this.filter === 'very_high') {
                    return item.uricAcid >= 300
                }

                return false
            })
        }
    }
};
</script>