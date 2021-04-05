			const array = response.data.results.recommendProducts.map(
				(a: { productCode: number }) => a.productCode
			);
