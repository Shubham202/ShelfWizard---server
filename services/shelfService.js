import TransactionModel from "../models/TransactionModel.js";

const seasonal = async season => {
	try {
		let transactions = await TransactionModel.find();

		// Filter transactions based on the season
		transactions = transactions.filter(transaction => {
			const month = transaction.date.getUTCMonth() + 1; // Adding 1 to convert to the usual month representation (1-indexed)
			if (season === "summer") return month >= 3 && month < 6;
			else if (season === "winter") return month < 2 || month >= 10;
			else if (season === "monsoon") return month >= 6 && month < 10;
			else if (season === "spring") return month === 2;
			else return true;
		});

		const minSupport = 2;

		const C1 = {};

		transactions.forEach(transaction => {
			transaction.products.forEach(item => {
				if (C1[item]) {
					C1[item]++;
				} else {
					C1[item] = 1;
				}
			});
		});

		const L1 = {};

		for (const item in C1) {
			if (C1[item] >= minSupport) {
				L1[item] = C1[item];
			}
		}

		function generateCandidates(Lk_1, k) {
			const candidates = [];
			const items = Object.keys(Lk_1);

			for (let i = 0; i < items.length; i++) {
				for (let j = i + 1; j < items.length; j++) {
					const itemset = [items[i], items[j]].sort();
					candidates.push(itemset);
				}
			}

			return candidates.filter(candidate => {
				const subsets = getSubsets(candidate, k - 1);
				return subsets.every(subset => {
					return subset.every(item => items.includes(item));
				});
			});
		}

		function generateCandidatesL2(L2) {
			const candidates = [];
			const items = Object.keys(L2);

			for (let i = 0; i < items.length; i++) {
				for (let j = i + 1; j < items.length; j++) {
					const itemset1 = items[i].split(",");
					const itemset2 = items[j].split(",");
					let common = true;
					for (let k = 0; k < itemset1.length - 1; k++) {
						if (itemset1[k] !== itemset2[k]) {
							common = false;
							break;
						}
					}
					if (common) {
						const newItemset = [
							...itemset1,
							itemset2[itemset2.length - 1]
						].sort();
						candidates.push(newItemset.join(","));
					}
				}
			}

			return candidates.filter(candidate => {
				const subsets = getSubsets(candidate.split(","), 2);
				return subsets.every(subset => subset.join(",") in L2);
			});
		}

		function getSubsets(arr, k) {
			const subsets = [];
			const len = arr.length;
			const subset = new Array(k);

			function helper(start, index) {
				if (index === k) {
					subsets.push(subset.slice());
				} else {
					for (let i = start; i < len; i++) {
						subset[index] = arr[i];
						helper(i + 1, index + 1);
					}
				}
			}

			helper(0, 0);
			return subsets;
		}

		const C2Candidates = generateCandidates(L1, 2);

		const C2 = {};

		C2Candidates.forEach(candidate => {
			const candidateString = candidate.join(",");
			C2[candidateString] = 0;
			transactions.forEach(transaction => {
				if (
					candidate.every(item => transaction.products.includes(item))
				) {
					C2[candidateString]++;
				}
			});
		});

		const L2 = {};

		for (const candidate in C2) {
			if (C2[candidate] >= minSupport) {
				L2[candidate] = C2[candidate];
			}
		}

		const C3Candidates = generateCandidatesL2(L2);

		const C3 = {};

		C3Candidates.forEach(candidate => {
			if (typeof candidate === "string") {
				C3[candidate] = 0;
				transactions.forEach(transaction => {
					if (
						candidate
							.split(",")
							.every(item => transaction.products.includes(item))
					) {
						C3[candidate]++;
					}
				});
			}
		});

		console.log(C3Candidates);

		return C3Candidates || C2Candidates || 0;
	} catch (error) {
		throw new Error(`Error fetching products: ${error.message}`);
	}
};

export default {
	seasonal
};