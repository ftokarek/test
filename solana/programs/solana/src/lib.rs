use anchor_lang::prelude::*;

declare_id!("8dz1hPzEJGAYxMND3aTi85832qdVHGAn3RiQum5J16fW");

#[program]
pub mod solana {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
