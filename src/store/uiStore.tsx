// import { create } from 'zustand';
// import { AlertColor } from '@mui/material/Alert';

// type State = {
//     open: boolean;
//     severity: AlertColor;
//     message: string;
// }

// const useUiStore = create<State>((set) => ({
//     worksLoading: false,
//     workFormLoading: false,
//     works: null,
//     fetchAllWorks: async () => {
//         set({ worksLoading: true });
//         try {
//             const response = await workService.getAllWorks();
//             set({ works: response });
//         }
//         catch (error: unknown) {
//             // TODO
//         }
//         finally {
//             set({ worksLoading: false });
//         }
//     },
//     fetchUpdateWork: async (work) => {
//         // set({ worksLoading: true });
//         try {
//             const response = await workService.updateWorkById(work.id!, work);
//         }
//         catch (error: unknown) {
//             // TODO
//         }
//         finally {
//             // set({ worksLoading: false });
//         }
//     },
//     fetchCreateWork: async (work) => {
//         // set({ worksLoading: true });
//         try {
//             const response = await workService.createWork(work);
//         }
//         catch (error: unknown) {
//             // TODO
//         }
//         finally {
//             // set({ worksLoading: false });
//         }
//     },
// }));

// export default useWorkStore;