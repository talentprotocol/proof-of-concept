
    <div>

          <div class="alert alert-danger" id="alert-error-https" style="display: none">
            You can run this example only over HTTPS connection.
          </div>

          <div id="prepare">
          <p>No wallet connected. <b>Connect your wallet to start investing in Talent Career Tokens</b>.</p>

            <button class="btn btn-primary" id="btn-connect">
              Connect wallet
            </button>
          </div>

          <div id="connected" style="display: none">

            <button class="btn btn-secondary" id="btn-disconnect">
              Disconnect wallet
            </button>

            <hr>

            <table class="table table-listing">
              <thead>
                <th>Your wallet address</th>
                <th>ETH balance</th>
              </thead>

              <tbody id="accounts">
              </tbody>
            </table>


          </div>

          <br>

          <button type="button" class="btn btn-primary" id="btn-invest" style="display: none">
              I WANT TO INVEST
          </button>
            

          <div id="my_investment" class="col-lg-12" style="display: none; margin-top: 40px; background-color: #efefef; padding: 40px">
            
            <div class="row">
            
                <div class="form-group col-lg-4">
                    <label for="inputInvestment">Investment (ETH)</label>
                    <input type="number" step="any" min="0" class="form-control" id="inputInvestment" aria-describedby="investmentHelp" placeholder="0.50" onchange="updateEstimatedUsd(value)" value="0.50" onkeyup="updateEstimatedUsd(value)">
                    <small id="investmentHelp" class="form-text text-muted"></small>
                  </div>
                  
                  <div class="form-group col-lg-4">
                    <label for="inputEmail">Email address or Name <i>(optional)</i></label>
                    <input type="email" class="form-control" id="inputEmail" aria-describedby="emailHelp" placeholder="Enter email">
                    <small id="emailHelp" class="form-text text-muted">Just to know who invested</small>
                  </div>

                <div class="form-group col-lg-12" style="margin-top: 20px">
                  <button id="btn-send" class="btn btn-primary">INVEST</button>
                </div>
            </div>
          </div>
    </div>


    
    <div id="templates" style="display: none">
      <template id="template-balance">
        <tr>
          <th class="address"></th>
          <td class="balance"></td>
        </tr>
      </template>
    </div>

    <script type="text/javascript" src="https://unpkg.com/web3@1.2.11/dist/web3.min.js"></script>
    <script type="text/javascript" src="https://unpkg.com/web3modal@1.9.0/dist/index.js"></script>
    <script type="text/javascript" src="https://unpkg.com/evm-chains@0.2.0/dist/umd/index.min.js"></script>
    <script type="text/javascript" src="https://unpkg.com/@walletconnect/web3-provider@1.2.1/dist/umd/index.min.js"></script>
    <script type="text/javascript" src="https://unpkg.com/fortmatic@2.0.6/dist/fortmatic.js"></script>

    <!-- This is our example code -->
    <script type="text/javascript" src="./utils.js"></script>
