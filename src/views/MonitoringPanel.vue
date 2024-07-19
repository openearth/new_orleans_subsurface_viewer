<template>
    <div class="monitoring-panel" :class="{ 'monitoring-panel--collapsed': panelIsCollapsed }">
        <v-btn v-if="!panelIsCollapsed" class="monitoring-panel__minimize" icon title="Minimaliseer"
            @click="onClickCollapse">
            <v-icon>mdi-chevron-down</v-icon>
        </v-btn>

        <div class="details d-flex flex-row">
            <div class="details__column">
                <h3 class="text-h6">
                    {{ locLongName }}
                </h3>
                <location-details :active-location="activeLocation" />
                <v-divider class="my-8" />
                <!-- <level-details 
                    :levels="levels"
                    :active-level="activeLevel"
                    :active-level-id="activeLevelId"
                    :active-location="activeLocation"
                    @change-level="onChangeLevel"
                    /> -->
            </div>

            <div class="details__column" style="margin-top: 30px">
                <v-card>
                    <v-tabs background-color="primary" center-active dark>
                        <v-tab>ground water head</v-tab>
                        <v-tab>geology</v-tab>
                        <v-tab>field measurement</v-tab>

                        <v-tab-item style="margin: 10px">
                            <h3 v-if="!activeLevel" class="text-h6">
                                Er is geen peilfilter geselecteerd, kies 'Selecteer peilfilter op deze meetlocatie' <br>
                                <v-icon color="black" size="48">mdi-arrow-bottom-left</v-icon>
                            </h3>
                            <h3 v-if="activeLevel" class="text-h6">
                                Tijdreeks voor {{ id }}
                            </h3>
                            <area-chart v-if="activeLevel" :timeseries="activeLevel.timeseries" :statistics="activeLevel.statistics" />
                        </v-tab-item>

                        <v-tab-item style="margin: 10px">
                            <h3 class="text-h6">
                                Boorgatmeting van meetlocatie {{ loc_id }} <br>
                                <div class="location-details__images" v-if="images.length">
                                    <a v-for="image in images" :key="image" :href="image" target="_blank"
                                        title="Open afbeelding in nieuw tabblad">
                                        <v-img :lazy-src="image" max-width="700" :src="image" alt="" />
                                    </a>
                                </div>
                            </h3>
                        </v-tab-item>

                        <v-tab-item style="margin: 10px">
                            <h3 v-if="!activeLevel" class="text-h6">
                                Er is geen peilfilter geselecteerd, kies 'Selecteer peilfilter op deze meetlocatie' <br>
                                <v-icon color="black" size="48">mdi-arrow-bottom-left</v-icon>
                            </h3>
                            <h3 v-else class="text-h6">
                                Informatie van {{ id }}
                                <br>
                                <br>
                                <v-card elevation="5">
                                    
                                    <v-simple-table v-if="activeLocation" class="data-table">
                                        <tbody>
                                            <tr>
                                                <th class="data-table__cell">Date</th>
                                                <th class="data-table__cell data-table__cell--align-right">
                                                    {{ activeLevel.parameters.parameter }} [{{ activeLevel.parameters.unit }}]
                                                </th>
                                            </tr>
                                            <tr v-for="item in tableData" :key="item.date">
                                                <td class="data-table__cell">{{ item.date }}</td>
                                                <td class="data-table__cell data-table__cell--align-right">{{ item[activeLevel.parameters.parameter] }}</td>
                                            </tr>
                                        </tbody>
                                    </v-simple-table>
                                </v-card>
                            </h3>
                        </v-tab-item>
                    </v-tabs>
                </v-card>

            </div>
        </div>

        <locations-layer 
            v-if="locations.length" 
            :locations="locations"
            :active-location="activeLocation"
            @click-marker="onClickMarker"
            />
    </div>
</template>
  
<script>
import AreaChart from '@/components/monitoring/area-chart/area-chart';
// import LevelDetails from '@/components/monitoring/level-details/level-details';
import LocationDetails from '@/components/monitoring/location-details/location-details';
import LocationsLayer from '@/components/monitoring/locations-layer/locations-layer';
import getLocationImages from '@/lib/get-location-images';
import getLocationsData from '@/lib/get-locations-data';
import getLevelData from '@/lib/get-level-data';
import getTableImages from '@/lib/get-table-images';

export default {
    components: {
        AreaChart,
        LocationDetails,
        LocationsLayer,
    },
    data() {
        return {
            images: [],
            tables: [],
            panelIsCollapsed: true,

            locations: [],
            activeLocationId: null,

            activeLevel: null,
            activeLevelId: null,
        };
    },
    created() {
        this.getLocations();
    },
    computed: {
        // levels() {
        //     if (!this.activeLocation) {
        //         return [];
        //     }

        //     const { filters, loc_id } = this.activeLocation.properties;
        //     const splitFilters = filters.toString().split(',');

        //     return splitFilters.map((filter) => {
        //         let suffix = '';
        //         if (filter === '1') {
        //             suffix = ' - Phreatic stage';
        //         } else if (filter === '2') {
        //             suffix = ' - 1\u1D49 Watervoerende pakket';
        //         } else if (filter === '3') {
        //             suffix = ' - 2\u1D49 Watervoerende pakket';
        //         }

        //         return {
        //             text: `${loc_id}_${filter}${suffix}`,
        //             value: `${loc_id}_${filter}`,
        //         };
        //     });
        // },
        activeLocation() {
            return this.locations.find(location => location.properties.loc_id === this.activeLocationId);
        },
        id() {
            return this.activeLevel.properties.locationid;
        },
        loc_id() {
            if (this.activeLocation && this.activeLocation.properties) {
                return this.activeLocation.properties.loc_id;
            }
            return null;
        },
        locLongName() {
            if (this.activeLocation && this.activeLocation.properties) {
                console.log('this.activeLocation.properties', this.activeLocation.properties);
                return this.activeLocation.properties.long_name;
            }
            return null;
        },
        tableData() {
            const parameter = this.activeLevel.parameters.parameter;

            const groupedByDate = new Map();

            this.activeLevel.timeseries.forEach(({ date, dateObj, head }) => {
                if(groupedByDate.has(date)) {
                    groupedByDate.get(date)[parameter] = head;
                    return;
                }

                groupedByDate.set(date, {
                    date,
                    dateObj,
                    [parameter]: head,
                });
            });

            return [...groupedByDate.values()].sort((a, b) => a.dateObj - b.dateObj);
        },
    },
    methods: {
        reset() {
            this.activeLevel = null;
        },

        onClickCollapse() {
            this.panelIsCollapsed = true;
        },

        onClickMarker({ id }) {
            this.activeLocationId = id;
            this.panelIsCollapsed = false;
        },

        onChangeLevel({ id }) {
            this.activeLevelId = id;
            this.getLevel({
                id
            });
        },

        getLocations() {
            return getLocationsData()
                .then(({ features }) => {
                    this.locations = features;
                })
                .catch(err => Promise.reject(err));
        },

        getLevel({ id }) {
            return getLevelData({ id })
                .then((activeLevel) => {
                    this.activeLevel = activeLevel;
                });
        },
    },
    watch: {
        activeLocation(location) {
            this.reset();

            if (location) {
                getLocationImages({ id: location.properties.loc_id })
                    .then((images) => this.images = images);
            }
            if (location) {
                getTableImages({ id: location.properties.loc_id })
                    .then((tables) => this.tables = tables);
            }
        },
    },
};
</script>
  
<style>
    .monitoring-panel {
        position: fixed;
        z-index: 5;
        bottom: 0;
        left: 0;
        right: 0;
        height: 44vh;
        overflow: hidden;
        transform: translateY(0);
        transition: transform 0.35s cubic-bezier(0.25, 0.8, 0.5, 1);
        background-color: #fff;
        box-shadow: 0 -2px 8px 0px rgba(0, 0, 0, .3);
    }

    .monitoring-panel--collapsed {
        transform: translateY(100%);
    }

    .monitoring-panel__minimize {
        position: absolute;
        top: 0;
        right: 0;
        margin: 8px;
    }

    .details {
        gap: 24px;
        height: 100%;
        padding: 24px 0;
        overflow: hidden;
    }

    .details__column {
        display: flex;
        flex-direction: column;
        height: 100%;
        padding: 0 24px;
        overflow: auto;
    }

    .details__column .text-h6 {
        margin-bottom: 16px;
    }

    .details__column:first-child {
        flex: 0 0 600px;
    }

    .details__column:last-child {
        flex: 1 1 auto;
    }

    .location-details__images {
        display: flex;
        justify-content: space-between;
        margin-top: 32px;
    }

    .data-table__cell {
        width: 25%;
    }

    .data-table__cell--align-right {
        text-align: right !important;
    }
</style>