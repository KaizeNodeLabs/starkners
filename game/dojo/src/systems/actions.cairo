use dojo_starter::models::{Direction, Position};

// define the interface
#[starknet::interface]
pub trait IActions<T> {
    fn spawn(ref self: T);
    fn move(ref self: T, direction: Direction);
}

// dojo decorator
#[dojo::contract]
pub mod actions {
    use super::{IActions, Direction, Position, next_position};
    use starknet::{ContractAddress, get_caller_address};
    use dojo_starter::models::{Vec2, Moves};

    use dojo::model::{ModelStorage};
    use dojo::event::EventStorage;

    #[derive(Copy, Drop, Serde)]
    #[dojo::event]
    pub struct Moved {
        #[key]
        pub player: ContractAddress,
        pub direction: Direction,
    }

    #[abi(embed_v0)]
    impl ActionsImpl of IActions<ContractState> {
        fn spawn(ref self: ContractState) {
            // Get the default world.
            let mut world = self.world_default();
        
            // Get the address of the current caller, possibly the player's address.
            let player = get_caller_address();
        
            // Initialize the player's position.
            let new_position = Position {
                player,
                vec: Vec2 { x: 0, y: 0 },
            };
            world.write_model(@new_position);
        
            // Initialize the player's moves.
            let moves = Moves {
                player,
                remaining: 100,
                last_direction: Option::None,
                can_move: true,
            };
            world.write_model(@moves);
        
            // Initialize the player's movement directions.
            self.initialize_directions(player, true, true, false);
        }

        // Implementation of the move function for the ContractState struct.
        fn move(ref self: ContractState, direction: Direction) {
            let mut world = self.world_default();
            let player = get_caller_address();
        
            // Retrieve the player's current position and moves data from the world.
            let position: Position = world.read_model(player);
            let mut moves: Moves = world.read_model(player);
        
            // If the player can't move, return early.
            if !moves.can_move {
                return;
            }
        
            // Deduct one from the player's remaining moves.
            moves.remaining -= 1;
        
            // Update the last direction the player moved in.
            moves.last_direction = Option::Some(direction);
        
            // Calculate the player's next position based on the provided direction.
            let next = next_position(position, moves.last_direction);
        
            // Write the new position to the world.
            world.write_model(@next);
        
            // Write the new moves to the world.
            world.write_model(@moves);
        
            // Update movement directions based on the current move.
            match direction {
                Direction::Up => {
                    // Example: Disable moving down after moving up.
                    self.update_directions(player, true, false, false);
                },
                Direction::Down => {
                    // Example: Disable moving up after moving down.
                    self.update_directions(player, false, true, false);
                },
                Direction::Left | Direction::Right => {
                    // Example: Enable both up and down after moving left or right.
                    self.update_directions(player, true, true, true);
                },
            }
        
            // Emit an event to the world to notify about the player's move.
            world.emit_event(@Moved { player, direction });
        }

        fn initialize_directions(ref self: ContractState, player: ContractAddress, up: bool, down: bool, both: bool) {
            let mut world = self.world_default();
    
            let directions = DirectionsAvailable {
                player,
                up,
                down,
                both,
            };
    
            // Write the new directions to the world.
            world.write_model(@directions);
        }

        fn update_directions(ref self: ContractState, player: ContractAddress, up: bool, down: bool, both: bool) {
            let mut world = self.world_default();
    
            // Retrieve the existing directions for the player.
            let mut directions: DirectionsAvailable = world.read_model(player);
    
            // Update the directions.
            directions.up = up;
            directions.down = down;
            directions.both = both;
    
            // Write the updated directions back to the world.
            world.write_model(@directions);
        }
    }

    #[generate_trait]
    impl InternalImpl of InternalTrait {
        /// Use the default namespace "dojo_starter". This function is handy since the ByteArray
        /// can't be const.
        fn world_default(self: @ContractState) -> dojo::world::WorldStorage {
            self.world(@"dojo_starter")
        }
    }
}

// Define function like this:
fn next_position(mut position: Position, direction: Option<Direction>) -> Position {
    match direction {
        Option::None => { return position; },
        Option::Some(d) => match d {
            Direction::Left => { position.vec.x -= 1; },
            Direction::Right => { position.vec.x += 1; },
            Direction::Up => { position.vec.y -= 1; },
            Direction::Down => { position.vec.y += 1; },
        },
    };
    position
}
