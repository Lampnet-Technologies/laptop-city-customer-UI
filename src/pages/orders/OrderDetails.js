import React from "react";

function OrderDetails() {
  let num = 1;

  return (
    <div className="border border-solid border-green rounded w-full">
      <div className="border-b border-b-solid border-b-gray-400 p-4 md:p-8 text-center text-lg font-semibold capitalize md:text-xl lg:text-[27px]">
        Order #### details
      </div>

      <div className="overflow-x-auto mt-12 mb-24">
        <table className="w-full whitespace-nowrap border-collapse">
          <thead>
            <tr style={{ borderBlock: "0.5px solid #7f98ae" }}>
              <th
                style={{ fontVariant: "all-small-caps" }}
                className="text-base leading-[21px] p-5 text-left"
              >
                s/n
              </th>
              <th
                style={{ fontVariant: "all-small-caps" }}
                className="text-base leading-[21px] p-5 text-center"
              >
                image
              </th>

              <th
                style={{ fontVariant: "all-small-caps" }}
                className="text-base leading-[21px] p-5 text-center"
              >
                product
              </th>
              <th
                style={{ fontVariant: "all-small-caps" }}
                className="text-base leading-[21px] p-5 text-center"
              >
                quantity
              </th>
              <th
                style={{ fontVariant: "all-small-caps" }}
                className="text-base leading-[21px] p-5 text-right"
              >
                price/unit
              </th>
            </tr>
          </thead>
          {/* {order && (
            <tbody>
              {order.map((row) => {
                return (
                  <tr
                    style={{
                      borderBlock: "0.5px solid #7f98ae",
                      cursor: "pointer",
                    }}
                    key={row.id}
                    
                  >
                    <td className="text-sm font-normal leading-6 capitalize p-5 text-center">
                        {num++}
                    </td>
                    <td className="text-sm font-normal leading-6 capitalize p-5 text-center">
                    <div
                                    style={{
                                      width: '5rem',
                                      height: '3.5rem',
                                      border: 'none',
                                      borderRadius: '5px',
                                      cursor: 'pointer',
                                      backgroundColor:'#8F8F8F',
                                      display: 'flex',
                                      justifyContent: 'center',
                                      alignItems: 'center'
                                    }}
                                   
                                  >
                                    <img
                                      src={row.product.images[0]?.image}
                                      alt={row.product.name}
                                      style={{
                                        maxWidth: '70%',
                                        maxHeight: '100%',
                                        borderRadius: '5px'
                                      }}
                                    />
                                  </div>
                    </td>
                    <td className="text-sm font-normal leading-6 capitalize p-5 text-center">
                    <div
                                    sx={{
                                      display: 'flex',
                                      whiteSpace: 'nowrap',
                                      flexDirection: 'column',
                                      gap: 4,
                                      py: 2
                                    }}
                                  >
                                    <span fontWeight='600'>{row.product.name}</span>
                                    <span>
                                      Category:
                                      
                                    </span>
                                    
                                    <div
                                      sx={{
                                        width: '4rem',
                                        height: '2rem',
                                        border: 'none',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                      }}
                                    >
                                      <img
                                        src={row.product.brand.logo ? row.product.brand.logo : ''}
                                        alt={row.product.brand.name}
                                        style={{
                                          maxWidth: '100%',
                                          maxHeight: '100%',
                                          height: '100%'
                                        }}
                                      />
                                    </div>
                                   
                                  </div>
                    </td>
                    <td className="text-sm font-normal leading-6 capitalize p-5 text-center">
                      {row.quantity}
                    </td>
                    <td className="text-sm leading-6 capitalize p-5 text-right font-medium">
                      <NairaSymbol />
                      {row.price}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          )} */}
        </table>
      </div>
    </div>
  );
}

export default OrderDetails;
