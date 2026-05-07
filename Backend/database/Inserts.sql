DECLARE @GuncelAlbumID INT = (SELECT TOP 1 AlbumID FROM Albums WHERE AlbumName = 'In Rainbows');

DELETE FROM Songs WHERE AlbumID = @GuncelAlbumID;

INSERT INTO Songs (SongTitle, Lyrics, AlbumID) VALUES 
('15 Step', 
'How come I end up where I started?
How come I end up where I went wrong?
Won''t take my eyes off the ball again
You reel me out then you cut the string

How come I end up where I started?
How come I end up where I went wrong?
Won''t take my eyes off the ball again
First you reel me out and then you cut the string

You used to be alright
What happened?
Did the cat get your tongue?
Did your string come undone?
One by one
One by one
It comes to us all
It''s as soft as your pillow

You used to be alright
What happened?
Etcetera, etcetera
Fifteen steps
Then a sheer drop', @GuncelAlbumID),

('Bodysnatchers', 
'I do not understand
What it is I''ve done wrong
Full of holes
Check for pulse
Blink your eyes
One for yes
Two for no

I have no idea what I am talking about
I''m trapped in this body and can''t get out

You killed the sound
Removed backbone
A pale imitation
With the edges sawn off

I have no idea what you are talking about
Your mouth moves only with someone''s hand up your ass
Has the light gone out for you?
Because the light''s gone out for me
It is the 21st century
It is the 21st century
It can follow you like a dog
It brought me to my knees
They got a skin and they put me in
They got a skin and they put me in
All the lines wrapped around my face
All the lines wrapped around my face
And for anyone else to see
And for anyone else to see
I''m a lie', @GuncelAlbumID),

('Nude', 
'Don''t get any big ideas
They''re not gonna happen
You paint yourself white
And fill up with noise
But there''ll be something missing

Now that you''ve found it, it''s gone
Now that you feel it, you don''t
You''ve gone off the rails

So don''t get any big ideas
They''re not gonna happen
You''ll go to hell for what your dirty mind is thinking', @GuncelAlbumID),

('Weird Fishes/Arpeggi', 
'In the deepest ocean
The bottom of the sea
Your eyes
They turn me

Why should I stay here?
Why should I stay?
I''d be crazy not to follow
Follow where you lead
Your eyes
They turn me

Turn me on to phantoms
I follow to the edge of the earth
And fall off
Yeah, everybody leaves
If they get the chance
And this is my chance

I get eaten by the worms
And weird fishes
Picked over by the worms
And weird fishes
Weird fishes
Weird fishes', @GuncelAlbumID),

('All I Need', 
'I''m the next act
Waiting in the wings
I''m an animal
Trapped in your hot car
I am all the days
That you choose to ignore

You are all I need
You are all I need
I''m in the middle of your picture
Lying in the reeds

I am a moth
Who just wants to share your light
I''m just an insect
Trying to get out of the night
I only stick with you
Because there are no others

You are all I need
You are all I need
I''m in the middle of your picture
Lying in the reeds

It''s all wrong
It''s all right
It''s all wrong
It''s all right', @GuncelAlbumID),

('Faust Arp', 
'Wakey wakey, rise and shine
It''s on again, off again, on again
Watch me fall like dominoes
In pretty patterns

Fingers in the blackbird pie
I''m tingling tingling tingling
It''s what you feel not what you ought to what you ought to
Reasonable and sensible

Dead from the neck up
Because I''m stuffed, stuffed, stuffed
We thought you had it in you
But no, no, no
For no real reason

Squeeze the tubes and empty bottles
And take a bow, take a bow, take a bow
It''s what you feel not what you ought to what you ought to

The elephant that''s in the room is
Tumbling, tumbling, tumbling
In duplicate and triplicate and
Plastic bags and
Duplicate and triplicate
Dead from the neck up
Guess I''m stuffed, stuffed, stuffed
We thought you had it in you
But no, no, no
Exactly where do you get off
Is enough is enough is enough
I love you but enough is enough, enough of that stuff
There''s no real reason', @GuncelAlbumID),

('Reckoner', 
'Reckoner
You can''t take it with you
Dancing for your pleasure

You are not to blame for
Bittersweet distractors
Dare not speak its name
Dedicated to all human beings

Because we separate
Like ripples on a blank shore
In rainbows
Because we separate
Like ripples on a blank shore

Reckoner
Take me with you
Dedicated to all human beings', @GuncelAlbumID),

('House of Cards', 
'I don''t want to be your friend
I just want to be your lover
No matter how it ends
No matter how it starts

Forget about your house of cards
And I''ll do mine
Forget about your house of cards
And I''ll do mine

And fall off the table
And get swept under
Denial, denial

The infrastructure will collapse
From voltage spikes
Throw your keys in the bowl
Kiss your husband goodnight

Forget about your house of cards
And I''ll do mine
Forget about your house of cards
And I''ll do mine

And fall off the table
And get swept under
Denial, denial
Denial, denial', @GuncelAlbumID),

('Jigsaw Falling into Place', 
'Just as you take my hand
Just as you write my number down
Just as the drinks arrive
Just as they play your favourite song
As your bad day disappears
No longer wound up like a spring
Before you''ve had too much
Come back and focus again

The walls are bending shape
They''ve got a cheshire cat grin
All blurring into one
This place is on a mission
Before the night owl
Before the animal noises
Closed circuit cameras
Before you''re comatose

Before you run away from me
Before you''re lost between the notes
The beat goes round and round
The beat goes round and round
I never really got there
I just pretended that I had

Words are blunt instruments
Words are a sawn off shotgun
Come on and let it out
Come on and let it out
Come on and let it out
Come on and let it out

Before you run away from me
Before you''re lost between the notes
Just as you take the mic
Just as you dance, dance, dance

Jigsaw falling into place
So there is nothing to explain
You eye each other as you pass
She looks back, you look back
Not just once
Not just twice
Wish away the nightmare
Wish away the nightmare
You got a light you can feel it on your back
A light you can feel it on your back
Jigsaw falling into place', @GuncelAlbumID),

('Videotape', 
'When I''m at the pearly gates
This''ll be on my videotape, my videotape
Mephistopheles is just beneath
And he''s reaching up to grab me

This is one for the good days
And I have it all here
In red, blue, green
Red, blue, green

You are my center
When I spin away
Out of control on videotape
On videotape
On videotape
On videotape

This is my way of saying goodbye
Because I can''t do it face to face
I''m talking to you before
No matter what happens now
You shouldn''t be afraid
Because I know today has been the most perfect day I''ve ever seen', @GuncelAlbumID);