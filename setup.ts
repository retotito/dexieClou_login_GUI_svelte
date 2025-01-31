import * as dexieJS from "../db"
import { setStateDialog } from '../stores/storeDialog'

export default async function setupApp() {

    /** 
     *
     *this is the part to subscribe for the custom login Gui 
     *
     */
    dexieJS.db.cloud.userInteraction.subscribe({
        next: (result) => {
            console.log("...Userinteraction: ", result)
            if(result !== undefined) {
                const data = {
                    ui: result
                }
                /** open a svelte component that contains a dialog box with a form */
                setStateDialog("dialogDexieLogin", data)
            }
        },
        error: error => console.log("userinteraction error: ", error)
    })
     /** 
     *
     * end part to subscribe for the custom login Gui 
     *
     */

  
    try { 
        await dexieJS.db.open() //init dexieJS database
    } catch (err) {
        console.log("db.open: " + err)
    }
    try { 
        await waitForDbConnection()
    } catch (err) {
        console.log("waitForDbConnection: " + err)
    }
    try { 
        await dexieJS.db.cloud.sync()
    } catch (err) {
        console.log("cloudSync: " + err)
    }

    /**  here would be some more code to continue with the app */
}
