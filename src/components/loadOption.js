import * as adminServices from "../services/adminService";

var options = [];

const sleep = ms =>
	new Promise(resolve => {
		setTimeout(() => {
			resolve();
		}, ms);
	});
let Search1;
const loadOptions = async (search, prevOptions) => {
	if (!search) {
		adminServices.userList(prevOptions.length / 10 + 1).then((resp) => {
			if (resp) {

				resp.data.data[0].data.map((data) => (
					options.push({
						value: `${data._id}`,
						label: `${data.userName}`
					})

				))

			}
		});
	}
	await sleep(1000);

	let filteredOptions;
	if (!search) {
		filteredOptions = options;
	} else {
		const searchLower = search.toLowerCase();
		if (Search1 !== search) {
			adminServices
				.userList(prevOptions.length / 10 + 1, search)
				.then((resp) => {

					resp.data.data[0].data.map((data) => (
						options.push({
							value: `${data._id}`,
							label: `${data.userName}`
						})

					))
				})
		}

		Search1 = search
		filteredOptions = options;


	}
	let divo = prevOptions.length / 10 + 1

	const hasMore = options.length / divo == 10 ? true : false
	const slicedOptions = filteredOptions.slice(
		prevOptions.length,
		prevOptions.length + 10
	);

	return {
		options: slicedOptions,
		hasMore
	};
};

export default loadOptions;