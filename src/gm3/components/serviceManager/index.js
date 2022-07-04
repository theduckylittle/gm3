import React, {useEffect, useState} from 'react';
import { connect, Provider } from 'react-redux';

import { changeTool } from '../../actions/map';
import { finishService } from '../../actions/query';

import ServiceForm from '../serviceForm';
import Results from './results';

import { SERVICE_STEPS } from '../../reducers/query';






const ServiceManager = function({
    changeTool,
    services,
    store,
    serviceName,
    serviceStep,
    defaultValues,
    selectionFeatures,
    finishService,
}) {
    const serviceDef = services[serviceName];
    let contents = false;

    if (serviceName === 'measure') {
        contents = <MeasureTool store={this.props.store} />;
    } else if (serviceDef && serviceStep === SERVICE_STEPS.START) {
        contents = (
            <ServiceForm
                serviceName={serviceName}
                serviceDef={serviceDef}
                defaultValues={defaultValues}
                onSubmit={(values) => {
                    if (serviceDef.autoGo !== true) {
                        // end the drawing
                        if (serviceDef.keepAlive !== true) {
                            changeTool(null);
                        }

                        const selection = normalizeSelection(selectionFeatures);
                        const fields = serviceDef.fields.map(field => ({
                            name: field.name,
                            value: values[field.name] || field.default,
                        }));

                        // check to see if the selection should stay
                        //  'alive' in the background.
                        if(serviceDef.keepAlive !== true) {
                            // shutdown the drawing on the layer.
                            changeTool(null);
                            finishService();
                        } else {
                            dispatch(showServiceForm(false));
                        }

                        serviceDef.query(selection, fields);
                    }
                }}
                onCancel={() => {
                    changeTool(null);
                    // this.props.onServiceFinished();
                }}
            />
        );
    } else if (serviceStep === SERVICE_STEPS.RESULTS) {
        contents = (
            <Results serviceDef={serviceDef} />
        );
    }

    return (
        <Provider store={store}>
            <div className='service-manager'>
                { contents }
            </div>
        </Provider>
    );
}

const mapStateToProps = state => ({
    serviceName: state.query.serviceName,
    serviceStep: state.query.step,
    selectionFeatures: state.mapSources.selection ? state.mapSources.selection.features : [],
});

const mapDispatchToProps = {
    changeTool,
    finishService,
};

export default connect(mapStateToProps, mapDispatchToProps)(ServiceManager);
