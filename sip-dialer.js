//import React from 'react';
import { VERSION } from '@twilio/flex-ui';
import { FlexPlugin } from 'flex-plugin';

//import CustomTaskListContainer from './components/CustomTaskList/CustomTaskList.Container';
import reducers, { namespace } from './states';

const PLUGIN_NAME = 'SipdialPlugin';

export default class SipdialPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   * @param manager { import('@twilio/flex-ui').Manager }
   */
  init(flex, manager) {
    this.registerReducers(manager);
// SIPDial Change
    flex.Actions.replaceAction('StartOutboundCall', (payload, original) => {
        // check if calling Queue is SIP
        console.log('Original Payload',payload)
        console.log('number to call:', "sip:"+payload.destination+"@<URL/IP_Address>;transport=tls;region=sg1")
        //payload.destination = "sip:"+payload.destination+"@<URL/IP_Address>;transport=tls;region=sg1"
        payload.destination = "sip:"+payload.destination+"@<URL/IP_Address>;transport=tls;region=sg1"
        console.log('updated outbound call to:', payload)
        original(payload)
    })
// End Change
  }

  /**
   * Registers the plugin reducers
   *
   * @param manager { Flex.Manager }
   */
  registerReducers(manager) {
    if (!manager.store.addReducer) {
      // eslint: disable-next-line
      console.error(`You need FlexUI > 1.9.0 to use built-in redux; you are currently on ${VERSION}`);
      return;
    }

    manager.store.addReducer(namespace, reducers);
  }
}
