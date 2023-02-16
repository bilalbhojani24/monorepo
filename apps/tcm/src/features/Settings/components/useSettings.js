import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setSelectedProject } from 'globalSlice';
// import {setAllTestRuns, setCurrentTab, setMetaPage} from "../../TestRuns/slices/testRunsSlice";
import { getSettingsApiKeys } from 'api/settings.api';
import {setCurrentTab} from "../slices/settingsSlice";


export default function useSettings() {
    const {  } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
    }, []);

    const handleTabChange = (tabName) => {
        dispatch(setCurrentTab(tabName.name));
    };

    const fetchAPIKey = () => {
        getSettingsApiKeys().then(
            (data) => {
                console.log("Got DAta from API Key");
                console.log(data)
                // dispatch(setAllTestRuns(data?.test_runs || []));
                // dispatch(setMetaPage(data?.info));
                // setTestRunsLoader(false);
            }
        );
    }

    return { handleTabChange, fetchAPIKey };
}
